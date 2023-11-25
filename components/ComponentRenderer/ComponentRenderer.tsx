'use client';

// renders a component from JSON
import {
  Card,
  Group,
  TextInput,
  Text,
  Center,
  Flex,
  Divider,
  Container,
  Select,
  SegmentedControl,
  Button,
  JsonInput,
} from '@mantine/core';
import './component.css';

import { useState, useEffect, ReactNode } from 'react';
import SvelteJSONEditor from './JSONeditor/VJSONEditor';

import {
  InputRenderer,
  OutputRenderer,
  SelectorRenderer,
  BooleanRenderer,
  MonitorRenderer,
} from './parametersRenderer/parametersRenderer';
import { TitleMenu } from './TitleMenu';

import useStore from './ComponentStore';

function ComponentPreview(props: { componentData: string; mode: string }) {
  const defaultComponentData = { inputs: [], outputs: [], parameters: [] };
  let componentData = defaultComponentData;
  const inputsAndParameters: ReactNode[] = [];
  const outputs: ReactNode[] = [];

  try {
    componentData = JSON.parse(props.componentData as string);
  } catch (error) {
    const errorDisplay = (
      <Center>
        <Text size="md" c="red">
          Malformed JSON
        </Text>
      </Center>
    );
    inputsAndParameters.push(errorDisplay);
    outputs.push(errorDisplay);
  }
  // inputs should only have string and number as types
  componentData.inputs.forEach((input, index) => {
    inputsAndParameters.push(
      <InputRenderer
        mode={props.mode}
        key={`input${index}`}
        index={index}
        label={input.label}
        default_value={input.default_value}
        default_unit={input.default_unit}
        data_type={input.data_type}
        description={input.description}
      />
    );
  });

  // parameters can have string, number, options, boolean as types
  componentData.parameters.forEach((param, index) => {
    if (param.type === 'option') {
      inputsAndParameters.push(
        <SelectorRenderer
          mode={props.mode}
          key={`option${index}`}
          index={index}
          label={param.label}
          options={param.options}
          default_value={param.default_value}
          data_type={param.data_type}
        />
      );
    } else if (param.type === 'boolean') {
      inputsAndParameters.push(
        <BooleanRenderer
          data_type={param.data_type}
          mode={props.mode}
          key={`boolean${index}`}
          index={index}
          default_value={param.default_value}
          label={param.label}
        />
      );
    } else {
      inputsAndParameters.push(
        <InputRenderer
          mode={props.mode}
          key={`parameter${index}`}
          index={index}
          label={param.label}
          default_value={param.default_value}
          default_unit={param.default_unit}
          data_type={param.data_type}
          description={param.description}
        />
      );
    }
  });

  // get outputs
  componentData.outputs.forEach((output, index) => {
    outputs.push(
      <OutputRenderer
        mode={props.mode}
        key={`output${output.label}`}
        index={index}
        label={output.label}
        default_value={output.default_value}
        default_unit={output.default_unit}
        data_type={output.data_type}
        description={output.description}
        formula={output.formula}
      />
    );
  });
  return (
    <Card shadow="xl" w={300} className="component-card">
      <Card.Section withBorder inheritPadding py="xs" mb="sm">
        {/* Title Editor */}
        <Card className="breakout" style={props.mode === 'Editor' ? {} : { display: 'none' }}>
          <Flex gap="xs" align="Flex-end">
            <TextInput
              size="xs"
              withAsterisk
              w={150}
              value={componentData.name}
              onChange={(e) => console.log(e.target.value)}
              description="Name"
              placeholder="Input placeholder"
            />
            <TextInput
              size="xs"
              withAsterisk
              w={150}
              value={componentData.category}
              onChange={(e) => console.log(e.target.value)}
              description="Category"
              placeholder="Input placeholder"
            />
          </Flex>
        </Card>
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
  const { components, setComponentsData, addNewComponent, addParam } = useStore();

  const [selectedComponentIndex, setSelectedComponentIndex] = useState('0');
  const [jsonString, setJsonString] = useState('');
  const [currentMode, setCurrentMode] = useState('Editor');

  const [componentNamesList, setComponentNamesList] = useState([]);

  // when selectedComponent changes, load the new component data
  useEffect(() => {
    setJsonString(JSON.stringify(components[parseInt(selectedComponentIndex, 10)], null, 2));
  }, [selectedComponentIndex]);

  useEffect(() => {
    console.log('components updated', components);
    const componentNames: { label: string; value: string }[] = components.map(
      (component, index) => ({
        label: component.name,
        value: index.toString(),
      })
    );
    setComponentNamesList(componentNames as any);
    setJsonString(JSON.stringify(components[parseInt(selectedComponentIndex, 10)], null, 2));
    console.log(componentNamesList);
  }, [components]);

  function ControlsRowRenderer() {
    return (
      <Group p={0}>
        <Card p={2.5} bg="none">
          <Divider
            p={0}
            m={0}
            size="xs"
            style={{ zoom: 0.25 }}
            label="Mode Selector"
            labelPosition="center"
          />
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
              w={250}
              data={componentNamesList}
              value={selectedComponentIndex}
              onChange={(e: string) => {
                setSelectedComponentIndex(e);
              }}
              searchable
            />
          </Group>
        </Card>
        <Card p={2.5} bg="none">
          <Divider
            p={0}
            m={0}
            size="xs"
            style={{ zoom: 0.25 }}
            label="Add New To JSON"
            labelPosition="center"
          />

          <Button.Group>
            <Button
              variant="default"
              onClick={() => {
                addNewComponent();
                setSelectedComponentIndex(components.length.toString());
              }}
              size="xs"
              disabled={currentMode !== 'Editor'}
            >
              Component
            </Button>
            {
              // add three buttons from this list: ['inputs', 'parameters', 'outputs']
              ['inputs', 'parameters', 'outputs'].map((paramType) => (
                <Button
                  onClick={() => {
                    addParam(paramType, parseInt(selectedComponentIndex, 10));
                  }}
                  variant="default"
                  size="xs"
                  disabled={currentMode !== 'Editor'}
                >
                  {paramType}
                </Button>
              ))
            }
          </Button.Group>
        </Card>
        <Card p={2.5} bg="none">
          <Divider
            p={0}
            m={0}
            size="xs"
            style={{ zoom: 0.25 }}
            label="DB Control"
            labelPosition="center"
          />
          <Button.Group>
            <Button variant="default" size="xs">
              Reset
            </Button>
            <Button variant="default" size="xs" disabled={currentMode === 'Viewer'}>
              Save
            </Button>
          </Button.Group>
        </Card>
      </Group>
    );
  }

  return (
    <div>
      <Center py={20}>
        {/* title  */} <ControlsRowRenderer />
      </Center>

      <Flex gap="md" justify="center">
        <Card w={currentMode === 'Editor' ? 900 : 350} bg="none" pb={50} pt={0}>
          <ComponentPreview componentData={jsonString} mode={currentMode} />
        </Card>
        {/* <JsonInput
          style={currentMode === 'JSON' ? {} : { display: 'none' }}
          maxRows={40}
          validationError="Invalid JSON"
          w={400}
          value={jsonString}
          onChange={setJsonString}
          autosize
        /> */}
        <Card
          py="0"
          bg="none"
          pl="0"
          ml="-25px"
          w={450}
          h={500}
          radius={0}
          style={currentMode === 'JSON' ? {} : { display: 'none' }}
        >
          <SvelteJSONEditor content={{ json: components[selectedComponentIndex] }} />
        </Card>
      </Flex>
    </div>
  );
}
