// return Card

import {
  CloseButton,
  Card,
  Flex,
  Divider,
  TextInput,
  Select,
  Button,
  Tooltip,
} from '@mantine/core';
import useStore from './ComponentStore';

export function Breakout(props) {
  const { data, height, mode, isOutput, index, parameter_type, componentID } = props;
  const data_types = ['number', 'curve', 'string', 'boolean', 'option'];
  const additional_controls = [];

  const { deleteParameter, updateParameter } = useStore();

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
        onChange={(e) => updateParameter(componentID, parameter_type, index, { default_unit: e })}
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
          // onChange={(e) => console.log(e.target.value)}
          onChange={(e) =>
            updateParameter(componentID, parameter_type, index, { label: e.target.value })
          }
          description="Label"
        />

        {parameter_type === 'outputs' ? (
          <TextInput
            size="xs"
            value={data.formula}
            onChange={(e) =>
              updateParameter(componentID, parameter_type, index, { formula: e.target.value })
            }
            withAsterisk
            w={300}
            description="Formula"
          />
        ) : (
          <>
            <TextInput
              size="xs"
              value={data.default_value}
              onChange={(e) =>
                updateParameter(componentID, parameter_type, index, {
                  default_value: e.target.value,
                })
              }
              withAsterisk
              w={100}
              description="Default Value"
            />

            <Select
              w={100}
              description="data type"
              size="xs"
              value={data.data_type}
              onChange={(e) =>
                updateParameter(componentID, parameter_type, index, { data_type: e })
              }
              data={data_types}
            />
          </>
        )}
        {additional_controls}
      </Flex>
      <Tooltip label={JSON.stringify({ componentID, index, parameter_type })}>
        <CloseButton
          onClick={() => {
            deleteParameter(componentID, parameter_type, index);
          }}
          size="xs"
          style={{ position: 'absolute', right: 3 }}
        />
      </Tooltip>
    </Card>
  );
}
