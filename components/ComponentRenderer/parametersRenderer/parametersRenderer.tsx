import { TextInput, Text, SegmentedControl, Select } from '@mantine/core';
import { useState } from 'react';
import { Breakout } from '../EditorBreakout';

interface Parameter {
  label: string;
  default_value: string;
  default_unit: string;
  mode: string;
  options: string[];
}

export const InputRenderer = (props: Parameter) => (
  <div>
    <Breakout
      index={props.index}
      isInput
      parameter_type="inputs"
      key={props.label}
      mode={props.mode}
      data={props}
      height={55}
    />
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
  </div>
);

export const OutputRenderer = (props: Parameter) => (
  <div>
    <Breakout
      index={props.index}
      key={props.label}
      isOutput
      parameter_type="outputs"
      mode={props.mode}
      data={props}
      height={55}
    />
    <TextInput
      type="number"
      description={props.label}
      defaultValue={props.default_value}
      rightSection={props.default_unit}
      rightSectionWidth={92}
      radius={0}
      pb="xs"
      size="xs"
    />
  </div>
);

export const SelectorRenderer = (props: Parameter) => {
  // if there are less than 5 options, use a segmented control
  if (props.options.length < 5) {
    return (
      <div>
        <Breakout
          index={props.index}
          parameter_type="parameters"
          key={props.label}
          mode={props.mode}
          data={props}
          height={55}
        />
        <Text c="dimmed" size="xs">
          <small>{props.label}</small>
        </Text>
        <SegmentedControl mb={8} fullWidth size="xs" data={props.options} />
      </div>
    );
  }
  // if there are more than 5 options, use a select
  return (
    <div>
      <Breakout
        parameter_type="parameters"
        index={props.index}
        key={props.label}
        mode={props.mode}
        data={props}
        height={55}
      />
      <Select
        defaultValue={props.options[0]}
        description={props.label}
        data={props.options}
        searchable
        pb="xs"
        size="xs"
      />
    </div>
  );
};

export const BooleanRenderer = (props: Parameter) => (
  <div>
    <Breakout
      parameter_type="parameters"
      index={props.index}
      key={props.label}
      mode={props.mode}
      data={props}
      height={55}
    />
    <Text c="dimmed" size="xs">
      <small>{props.label}</small>
    </Text>
    <SegmentedControl mb={8} fullWidth size="xs" data={['on', 'off']} />
  </div>
);
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
