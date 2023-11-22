// return Card

import { Card, Flex, Divider, TextInput, Select } from '@mantine/core';

export function Breakout(props) {
  const { data, height } = props;
  const parameter_types = ['number', 'string', 'boolean'];
  return (
    <Card radius={2} className="breakout" h={height}>
      <Divider orientation="horizontal" className="breakout-line" color="red" />
      <Flex gap="xs" align="center">
        <TextInput
          size="xs"
          withAsterisk
          w={100}
          value={data.label}
          description="Label"
          placeholder="Input placeholder"
        />
        <TextInput
          size="xs"
          value={data.default_value}
          withAsterisk
          w={100}
          description="Default Value"
        />
        <Select
          w={100}
          description="data type"
          size="xs"
          value={data.parameter_type}
          data={parameter_types}
        />
      </Flex>
    </Card>
  );
}
