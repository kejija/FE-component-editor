import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Card, Select, Text } from '@mantine/core';
import { useState } from 'react';

// list of colors to use for the lines, all about neutral colors
const colors: string[] = [
  '#85a6b8',
  '#579254',
  '#3696b9',
  '#8f97cd',
  '#4f82c9',
  '#4c5252',
  '#91c99e',
  '#6b7ea0',
  '#574941',
  '#636ab8',
  '#55bd70',
  '#a8a148',
  '#403d7d',
  '#c8b952',
  '#a64cbf',
  '#97b28c',
  '#ac79bb',
  '#c97633',
  '#82719c',
  '#a76bb5',
  '#955840',
  '#4f6f69',
  '#9a657d',
  '#7267a9',
  '#4b8661',
];

export default function DataPlotter(props) {
  const { title, data, containerHeight } = props;
  // const title = 'Example';
  const lines: any[] = [];
  const columns: string[] = [];
  const [x_dataKey, setX_dataKey] = useState('n/a');

  Object.keys(data[0]).forEach((key, index) => {
    if (key !== x_dataKey) {
      lines.push(<Line type="monotone" dataKey={key} strokeWidth={2} stroke={colors[index]} key={'line' + index} />);
      columns.push(key);
    }
  });

  return (
    // <ResponsiveContainer width="100%" height="100%">
    <Card w="100%" h={containerHeight || 250} radius={0} p={2} shadow="none">
      <Select
        placeholder="x axis value"
        description={`${title} - ${x_dataKey} as x`}
        w={'100%'}
        size="xs"
        value={x_dataKey}
        onChange={setX_dataKey}
        data={columns}
      />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid />
          <XAxis fontSize="0.7em" dataKey={x_dataKey} />
          <YAxis fontSize="0.7em" />
          <Tooltip />
          <Legend fontSize="0.5em" />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    </Card>
    // </ResponsiveContainer>
  );
}
