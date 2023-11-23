'use client';

import {
  Card,
  Group,
  TextInput,
  Menu,
  ActionIcon,
  Text,
  Center,
  rem,
  Flex,
  Divider,
  Container,
  Select,
  Switch,
  SegmentedControl,
  Tabs,
  Button,
  JsonInput,
  Paper,
} from '@mantine/core';
import './component.css';

import { useState, useEffect } from 'react';

import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import { ReactNode } from 'react';

import { demoData } from './demoData.js';
import { Breakout } from './EditorBreakout';

const TitleMenu = (props) => (
  <Group justify="space-between">
    <Text>{props.component.name}</Text>
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <IconDots style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconFileZip style={{ width: rem(14), height: rem(14) }} />}>
          Duplicate
        </Menu.Item>
        <Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}>
          Preview CAD
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          color="red"
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </Group>
);

const InputRenderer = (props) => (
  <div>
    <Breakout mode={props.mode} data={props} height={55} />
    <TextInput
      type="number"
      description={props.label}
      placeholder={props.default_value}
      rightSection={props.default_unit}
      rightSectionWidth={92}
      radius={0}
      pb="xs"
      size="xs"
    />
  </div>
);

const OutputRenderer = (props) => (
  <div>
    <Breakout isOutput mode={props.mode} data={props} height={55} />
    <TextInput
      type="number"
      description={props.label}
      defaultValue={props.default_value}
      rightSection={props.default_unit}
      rightSectionWidth={92}
      radius={0}
      pb="xs"
      size="xs"
    />
  </div>
);

const SelectorRenderer = (props) => {
  // if there are less than 5 options, use a segmented control
  if (props.options.length < 5) {
    return (
      <div>
        <Breakout mode={props.mode} data={props} height={55} />
        <Text c="dimmed" size="xs">
          <small>{props.label}</small>
        </Text>
        <SegmentedControl mb={8} fullWidth size="xs" data={props.options} />
      </div>
    );
  }
  // if there are more than 5 options, use a select
  return (
    <div>
      <Breakout mode={props.mode} data={props} height={55} />
      <Select
        defaultValue={props.options[0]}
        description={props.label}
        data={props.options}
        searchable
        pb="xs"
        size="xs"
      />
    </div>
  );
};

const BooleanRenderer = (props) => (
  <div>
    <Breakout mode={props.mode} data={props} height={55} />
    <Text c="dimmed" size="xs">
      <small>{props.label}</small>
    </Text>
    <SegmentedControl mb={8} fullWidth size="xs" data={['on', 'off']} />
  </div>
);
const MonitorRenderer = (props) => {
  const tabs = ['Plot', '3D View', 'Datasheet'];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <SegmentedControl
      mb={8}
      fullWidth
      size="xs"
      data={tabs}
      value={currentTab}
      onChange={setCurrentTab}
    />
  );
};

function ComponentPreview(props) {
  const defaultComponentData = { inputs: [], outputs: [], parameters: [] };
  let componentData = defaultComponentData;
  const inputsAndParameters: ReactNode[] = [];
  const outputs: ReactNode[] = [];

  try {
    componentData = JSON.parse(props.componentData);
  } catch (error) {
    const errorDisplay = (
      <Center>
        <Text size="xl" c="red">
          Malformed JSON
        </Text>
      </Center>
    );
    inputsAndParameters.push(errorDisplay);
    outputs.push(errorDisplay);
  }
  // inputs should only have string and number as types
  componentData.inputs.forEach((input) => {
    inputsAndParameters.push(
      <InputRenderer
        mode={props.mode}
        key={input.label + 'input'}
        label={input.label}
        default_value={input.default_value}
        default_unit={input.default_unit}
        parameter_type={input.parameter_type}
        description={input.description}
      />
    );
  });

  // parameters can have string, number, options, boolean as types
  componentData.parameters.forEach((param) => {
    if (param.type === 'option') {
      inputsAndParameters.push(
        <SelectorRenderer
          mode={props.mode}
          key={param.label + 'option'}
          label={param.label}
          options={param.options}
          default_value={param.default_value}
          parameter_type={param.parameter_type}
        />
      );
    } else if (param.type === 'boolean') {
      inputsAndParameters.push(
        <BooleanRenderer
          parameter_type={param.parameter_type}
          mode={props.mode}
          key={param.label + 'boolean'}
          default_value={param.default_value}
          label={param.label}
        />
      );
    } else {
      inputsAndParameters.push(
        <InputRenderer
          mode={props.mode}
          key={param.label + 'parameter'}
          label={param.label}
          default_value={param.default_value}
          default_unit={param.default_unit}
          parameter_type={param.parameter_type}
          description={param.description}
        />
      );
    }
  });

  // get outputs
  componentData.outputs.forEach((output) => {
    outputs.push(
      <OutputRenderer
        mode={props.mode}
        key={output.label + 'output'}
        label={output.label}
        default_value={output.default_value}
        default_unit={output.default_unit}
        parameter_type={output.parameter_type}
        description={output.description}
        formula={output.formula}
      />
    );
  });
  return (
    <Card shadow="xl" w={300} className="component-card">
      <Card.Section withBorder inheritPadding py="xs" mb="sm">
        <TitleMenu component={componentData} />
      </Card.Section>

      <Card.Section py="xs">
        <Container>
          <Divider label="OUTPUTS" color="red" />
          {outputs}
          <Divider label="PARAMETERS" color="red" />
          {inputsAndParameters}
        </Container>
      </Card.Section>
      <Divider label="MONITORS" color="red" />
      <MonitorRenderer />
    </Card>
  );
}

export function ComponentRenderer() {
  const componentNames = demoData.map((component, index) => ({
    label: component.name,
    value: index.toString(),
  }));

  const [selectedComponent, setSelectedComponent] = useState(componentNames[0].value);
  const [jsonString, setJsonString] = useState(JSON.stringify(demoData[0], null, 2));
  const [canRender, setCanRender] = useState(true);
  const [currentMode, setCurrentMode] = useState('Editor');

  // when selectedComponent changes, load the new component data
  useEffect(() => {
    const selectedComponentId = parseInt(selectedComponent);
    console.log(demoData[selectedComponentId]);
    setJsonString(JSON.stringify(demoData[selectedComponentId], null, 2));
    // setJson(JSON.stringify(newComponentData, null, 2));
  }, [selectedComponent]);

  function isValidateJson(inputValue) {
    try {
      JSON.parse(inputValue);
    } catch (error) {
      setCanRender(false);
      return false;
    }
    setCanRender(true);
    return true;
  }
  return (
    <div>
      <Center py={20}>
        <Group>
          <SegmentedControl
            size="xs"
            data={['Editor', 'JSON', 'Viewer']}
            value={currentMode}
            onChange={setCurrentMode}
          />
          <Select
            size="xs"
            allowDeselect={false}
            w={500}
            defaultValue={componentNames[0]}
            data={componentNames}
            value={selectedComponent}
            onChange={setSelectedComponent}
          />
          <Button.Group>
            <Button variant="default" size="xs">
              Reset to Default
            </Button>
            <Button variant="default" size="xs" disabled={!canRender}>
              Save to DB
            </Button>
          </Button.Group>
        </Group>
      </Center>
      <Flex gap="md" justify="center">
        <Card w={currentMode === 'Editor' ? 900 : 350} bg="none" pb={50} pt={0}>
          <ComponentPreview componentData={jsonString} mode={currentMode} />
        </Card>
        <JsonInput
          style={currentMode === 'JSON' ? {} : { display: 'none' }}
          maxRows={20}
          validationError="Invalid JSON"
          w={300}
          value={jsonString}
          onChange={(event) => {
            isValidateJson(event);
            setJsonString(event);
          }}
          autosize
        />
      </Flex>
    </div>
  );
}
