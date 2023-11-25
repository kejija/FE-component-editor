// return Card

import {
  CloseButton,
  Card,
  Flex,
  Divider,
  TextInput,
  Select,
  Button,
  ButtonGroup,
} from '@mantine/core';
import useStore from './ComponentStore';

export function Breakout(props) {
  const { data, height, mode, isOutput, index, parameter_type } = props;
  const data_types = ['number', 'curve', 'string', 'boolean', 'option'];
  const additional_controls = [];

  if (data.data_type === 'option') {
    additional_controls.push(
      <Button variant="outline" size="xs">
        Edit Options
      </Button>
    );
  } else if (data.data_type === 'number') {
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
  return (
    <Card
      radius={2}
      className="breakout"
      h={height}
      style={mode !== 'Editor' ? { display: 'none' } : {}}
      shadow="xs"
    >
      <Divider orientation="horizontal" className="breakout-line" color="red" />
      <Flex gap="xs" align="Flex-end" w="100%">
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
            value={data.data_type}
            onChange={(e) => console.log(e.target.value)}
            data={data_types}
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
      <CloseButton
        onClick={() => {
          console.log('deleting', data, index);
        }}
        size="xs"
        style={{ position: 'absolute', right: 3 }}
      />
    </Card>
  );
}
