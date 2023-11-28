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
import useStore from '../ComponentStore';
import SvelteJSONEditor from './VJSONEditor';
import DataPlotter from './DataPlotter';

export function Breakout(props) {
  const { data, height, mode, index, parameter_type, componentID } = props;
  const data_types = ['number', 'table', 'string', 'boolean', 'option', 'datasheet'];
  // let additional_controls = null;

  const { deleteParameter, updateParameter } = useStore();
  function AdditionalControls() {
    switch (data.data_type) {
      case 'number':
        return (
          <>
            <TextInput
              key={`number-default-value-editor${index}`}
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
              key={`select-default-unit-editor${index}`}
              w={60}
              description="units"
              size="xs"
              value={data.default_unit}
              onChange={(e) =>
                updateParameter(componentID, parameter_type, index, { default_unit: e })}
              data={['mm']}
            />
          </>
        );
      case 'table':
        return (
          <>
            <Popover
              key="table-editor"
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
      case 'string':
        break;
      case 'boolean':
        break;
      case 'option':
        return (
          <>
            <Popover
              trapFocus
              width={500}
              position="bottom"
              withArrow
              shadow="md"
            >
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
                  onChange={
                    (e) => updateParameter(componentID, parameter_type, index, { options: e })
                  }
                />
              </Popover.Dropdown>
            </Popover>
          </>
        );
      case 'datasheet':
        return (
          <>
            <Popover
              key='datasheet-editor'
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
      default:
        break;
    }
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
          key='label-editor'
          onChange={(e) =>
            updateParameter(componentID, parameter_type, index, { label: e.target.value })
          }
          description="Label"
        />

        {parameter_type === 'outputs' ? (
          <TextInput
            size="xs"
            value={data.formula}
            key='formula-editor'
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
              key='data-type-editor'
              size="xs"
              value={data.data_type}
              onChange={(e) =>
                updateParameter(componentID, parameter_type, index, { data_type: e })
              }
              data={data_types}
            />
          </>
        )}
        <AdditionalControls />
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
