'use client';

import {
  Card,
  Grid,
  Group,
  TextInput,
  Menu,
  ActionIcon,
  Text,
  Badge,
  Center,
  Button,
  rem,
  Flex,
  Paper,
  Divider,
  Container,
  Select,
  Switch,
  SegmentedControl,
  Tabs,
  JsonInput,
} from '@mantine/core';

import { useState, useEffect, use } from 'react';

import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  JSX,
} from 'react';

import { demoData } from './demoData.js';
const demoComponentData = demoData[0];

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

const ParameterRenderer = (props) => {
  const { name, type, description } = props;
  return (
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
  );
};

const SelectorRenderer = (props) => {
  // if there are less than 5 options, use a segmented control
  if (props.options.length < 5) {
    return (
      <div>
        <Text c="dimmed" size="xs">
          <small>{props.label}</small>
        </Text>
        <SegmentedControl fullWidth size="xs" data={props.options} />
      </div>
    );
  }
  // if there are more than 5 options, use a select
  return (
    <Select
      defaultValue={props.options[0]}
      description={props.label}
      data={props.options}
      searchable
      pb="xs"
      size="xs"
    />
  );
};

const BooleanRenderer = (props) => <Switch label={props.label} pb="xs" size="xs" />;

const MonitorRenderer = (props) => {
  const tabs = ['Plot', '3D View', 'Datasheet'];
  return (
    <Tabs>
      <Tabs.List grow>
        {tabs.map((tab) => (
          <Tabs.Tab value={tab} key={tab}>
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panel value="Plot">Graph of outputs value over time</Tabs.Panel>
      <Tabs.Panel value="3D View">3D Render of CAD</Tabs.Panel>
      <Tabs.Panel value="Datasheet">Table of Datasheet value from DB</Tabs.Panel>
    </Tabs>
  );
};

function ComponentPreview(props) {
  const componentData =
    props.componentData === undefined
      ? { inputs: [], outputs: [], parameters: [] }
      : JSON.parse(props.componentData);

  console.log(componentData);
  const inputsAndParameters: ReactNode[] = [];
  const outputs: ReactNode[] = [];
  // inputs should only have string and number as types
  componentData.inputs.forEach((input) => {
    inputsAndParameters.push(
      <ParameterRenderer
        label={input.label}
        default_value={input.default_value}
        default_unit={input.default_unit}
        type={input.parameter_type}
        description={input.description}
      />
    );
  });

  // parameters can have string, number, options, boolean as types
  componentData.parameters.forEach((param) => {
    if (param.type === 'option') {
      inputsAndParameters.push(<SelectorRenderer label={param.name} options={param.options} />);
    } else if (param.type === 'boolean') {
      inputsAndParameters.push(<BooleanRenderer label={param.name} />);
    } else {
      inputsAndParameters.push(
        <ParameterRenderer
          label={param.name}
          default_value={param.default_value}
          default_unit={param.default_unit}
          type={param.parameter_type}
          description={param.description}
        />
      );
    }
  });

  // get outputs
  componentData.outputs.forEach((output) => {
    outputs.push(
      <ParameterRenderer
        label={output.name}
        default_value={output.default_value}
        default_unit={output.default_unit}
        type={output.parameter_type}
        description={output.description}
      />
    );
  });
  return (
    <Card shadow="xl">
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

  const [selectedComponent, setSelectedComponent] = useState(componentNames[0]);
  const [json, setJson] = useState(JSON.stringify(demoData[0], null, 2));
  const [canRender, setCanRender] = useState(true);

  // when selectedComponent changes, load the new component data
  useEffect(() => {
    const selectedComponentId = parseInt(selectedComponent);
    console.log(demoData[selectedComponentId]);
    setJson(JSON.stringify(demoData[selectedComponentId], null, 2));
    // setJson(JSON.stringify(newComponentData, null, 2));
  }, [selectedComponent]);

  // when json changes, reload preview
  // useEffect(() => {
  //   if (canRender) {
  //     console.log('render');
  //   }
  // });

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
        <Select
          allowDeselect={false}
          w={500}
          defaultValue={componentNames[0]}
          data={componentNames}
          value={selectedComponent}
          onChange={setSelectedComponent}
        />
      </Center>
      <Flex gap="md" justify="center">
        <ComponentPreview componentData={json} />
        <JsonInput
          maxRows={20}
          validationError="Invalid JSON"
          variant="filled"
          w={500}
          value={json}
          onChange={(event) => {
            isValidateJson(event);
            setJson(event);
          }}
          autosize
        />
      </Flex>
    </div>
  );
}
