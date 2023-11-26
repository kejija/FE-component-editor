import { TextInput, Text, SegmentedControl, Select } from '@mantine/core';
import { useState } from 'react';

import { Breakout } from '../EditorBreakout';

export const MonitorRenderer = () => {
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

export const ParameterRow = (props: any) => {
  const { mode, parameter_type, index, parameterData, componentID } = props;
  const { label, default_value, default_unit, options, data_type } = parameterData;

  let inputElement = null;

  switch (data_type) {
    case 'string':
      inputElement = (
        <TextInput
          type="string"
          description={label}
          placeholder={default_value}
          // rightSection={default_unit}
          rightSectionWidth={92}
          radius={0}
          pb="xs"
          size="xs"
        />
      );
      break;
    case 'number':
      inputElement = (
        <TextInput
          type="number"
          description={label}
          placeholder={default_value}
          rightSection={default_unit}
          rightSectionWidth={92}
          radius={0}
          pb="xs"
          size="xs"
        />
      );
      break;
    case 'option':
      if (options.length < 5) {
        inputElement = (
          <>
            <Text c="dimmed" size="xs">
              <small>{props.label}</small>
            </Text>
            <SegmentedControl mb={8} fullWidth size="xs" data={options} />
          </>
        );
      } else {
        // if there are more than 5 options, use a select
        inputElement = (
          <Select
            defaultValue={options[0]}
            description={label}
            data={options}
            searchable
            pb="xs"
            size="xs"
          />
        );
      }
      break;
    case 'boolean':
      inputElement = (
        <div>
          <Text c="dimmed" size="xs">
            <small>{label}</small>
          </Text>
          <SegmentedControl mb={8} fullWidth size="xs" data={['on', 'off']} />
        </div>
      );
      break;
    case 'curve':
      break;
    default:
      break;
  }

  return (
    <div className="parameterRow">
      <Breakout
        componentID={componentID}
        parameter_type={parameter_type}
        index={index}
        key={label}
        mode={mode}
        data={parameterData}
        height={55}
      />
      {inputElement}
    </div>
  );
};
