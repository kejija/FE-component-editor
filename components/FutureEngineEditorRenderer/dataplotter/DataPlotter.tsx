import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { Card, Select, Text, Group } from '@mantine/core';
import { useState } from 'react';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
  const { title, data } = props;
  // const title = 'Example';
  const lines: any[] = [];
  const columns: string[] = [];
  const [x_dataKey, setX_dataKey] = useState('n/a');

  Object.keys(data[0]).forEach((key, index) => {
    if (key !== x_dataKey) {
      lines.push(<Line type="monotone" dataKey={key} strokeWidth={2} stroke={colors[index]} />);
      columns.push(key);
    }
  });

  return (
    // <ResponsiveContainer width="100%" height="100%">
    <Card w="100%" radius={0} p={5}>
      <Group>
        <Select
          placeholder="x axis value"
          w={150}
          size="xs"
          value={x_dataKey}
          onChange={setX_dataKey}
          data={columns}
        />
        <Text>
          {title} <small>x = {x_dataKey}</small>
        </Text>
      </Group>
      <LineChart data={data} height={300} width={450}>
        <CartesianGrid />
        <XAxis fontSize="0.7em" dataKey={x_dataKey} />
        <YAxis fontSize="0.7em" />
        <Tooltip />
        <Legend fontSize="0.5em" />
        {lines}
      </LineChart>
    </Card>
    // </ResponsiveContainer>
  );
}
