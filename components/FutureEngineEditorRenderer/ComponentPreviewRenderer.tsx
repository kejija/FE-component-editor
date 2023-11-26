// this file render what it looks like in Future Engine app

import { Card, TextInput, Flex, Divider, Container } from '@mantine/core';

import {
  // InputRenderer,
  // OutputRenderer,
  // SelectorRenderer,
  // BooleanRenderer,
  MonitorRenderer,
  ParameterRow,
} from './parametersRenderer/parametersRenderer';
import { TitleMenu } from './TitleMenu';

function ComponentPreview(props: { componentData: JSON; mode: string; componentID: number }) {
  const componentData: JSON = props.componentData || {
    inputs: [],
    outputs: [],
    parameters: [],
  };
  const componentParameters = {
    inputs: [],
    outputs: [],
    parameters: [],
  };

  // compile parameter rows
  const parameter_types: string[] = ['outputs', 'parameters'];
  parameter_types.forEach((parameter_type) => {
    componentData[parameter_type].forEach((parameterData: any, index: number) => {
      componentParameters[parameter_type].push(
        <ParameterRow
          componentID={props.componentID}
          mode={props.mode}
          parameter_type={parameter_type}
          key={`parameterData${parameterData.label}`}
          index={index}
          parameterData={parameterData}
        />
      );
    });
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
          {componentParameters.outputs}
          <Divider label="PARAMETERS" color="red" />
          {componentParameters.parameters}
        </Container>
      </Card.Section>
      <Divider label="MONITORS" color="red" />
      <MonitorRenderer />
    </Card>
  );
}

export default ComponentPreview;
