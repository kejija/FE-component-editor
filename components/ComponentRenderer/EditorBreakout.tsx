// return Card

import { Card, Flex, Divider, TextInput, Select, Button } from '@mantine/core';

export function Breakout(props) {
  const { data, height, mode, isOutput } = props;
  const parameter_types = ['number', 'curve', 'string', 'boolean', 'option'];
  const additional_controls = [];
  if (data.parameter_type === 'option') {
    additional_controls.push(
      <Button variant="outline" size="xs">
        Edit Options
      </Button>
    );
  } else if (data.parameter_type === 'number') {
    additional_controls.push(
      <Select
        w={60}
        description="units"
        size="xs"
        value={data.default_unit}
        onChange={(e) => console.log(e.target.value)}
        data={['mm']}
      />
    );
  }
  console.log(additional_controls);
  return (
    <Card
      radius={2}
      className="breakout"
      h={height}
      style={mode !== 'Editor' ? { display: 'none' } : {}}
      shadow="xs"
    >
      <Divider orientation="horizontal" className="breakout-line" color="red" />
      <Flex gap="xs" align="Flex-end">
        <TextInput
          size="xs"
          withAsterisk
          w={100}
          value={data.label}
          onChange={(e) => console.log(e.target.value)}
          description="Label"
          placeholder="Input placeholder"
        />
        {isOutput ? null : (
          <TextInput
            size="xs"
            value={data.default_value}
            onChange={(e) => console.log(e.target.value)}
            withAsterisk
            w={100}
            description="Default Value"
          />
        )}
        {isOutput ? null : (
          <Select
            w={100}
            description="data type"
            size="xs"
            value={data.parameter_type}
            onChange={(e) => console.log(e.target.value)}
            data={parameter_types}
          />
        )}
        {isOutput ? (
          <TextInput
            size="xs"
            value={data.formula}
            onChange={(e) => console.log(e.target.value)}
            withAsterisk
            w={300}
            description="Formula"
          />
        ) : null}
        {additional_controls}
      </Flex>
    </Card>
  );
}
