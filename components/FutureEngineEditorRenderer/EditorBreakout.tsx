// return Card

import {
  CloseButton,
  Card,
  Flex,
  Divider,
  TextInput,
  Select,
  Button,
  Popover,
  Tooltip,
  TagsInput,
  Center,
} from '@mantine/core';
import useStore from './ComponentStore';
import SvelteJSONEditor from './JSONeditor/VJSONEditor';
import DataPlotter from './dataplotter/DataPlotter';

export function Breakout(props) {
  const { data, height, mode, index, parameter_type, componentID } = props;
  const data_types = ['number', 'table', 'string', 'boolean', 'option', 'datasheet'];
  const additional_controls = [];

  const { deleteParameter, updateParameter } = useStore();

  if (data.data_type === 'option') {
    additional_controls.push(
      <>
        <Popover trapFocus width={500} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button size="xs" variant="outline">
              Edit Options
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <TagsInput
              variant="filled"
              size="xs"
              description="options list"
              value={data.options || []}
              onChange={(e) => updateParameter(componentID, parameter_type, index, { options: e })}
            />
          </Popover.Dropdown>
        </Popover>
      </>
    );
  } else if (data.data_type === 'table') {
    additional_controls.push(
      <>
        <Popover
          closeOnClickOutside={false}
          trapFocus
          width={500}
          position="bottom"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <Button size="xs" variant="outline">
              Edit Table Data
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <SvelteJSONEditor
              mode="table"
              content={{ json: data.table }}
              onChange={(e) =>
                updateParameter(componentID, parameter_type, index, { table: e.json })
              }
            />
            <Center>
              <DataPlotter title={data.label} data={data.table} />
            </Center>
          </Popover.Dropdown>
        </Popover>
      </>
    );
  } else if (data.data_type === 'datasheet') {
    additional_controls.push(
      <>
        <Popover
          closeOnClickOutside={false}
          trapFocus
          width={500}
          position="bottom"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <Button size="xs" variant="outline">
              Select Datasheet Options
            </Button>
          </Popover.Target>
          <Popover.Dropdown>TO DO</Popover.Dropdown>
        </Popover>
      </>
    );
  } else if (data.data_type === 'number') {
    additional_controls.push(
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
          w={60}
          description="units"
          size="xs"
          value={data.default_unit}
          onChange={(e) => updateParameter(componentID, parameter_type, index, { default_unit: e })}
          data={['mm']}
        />
      </>
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
