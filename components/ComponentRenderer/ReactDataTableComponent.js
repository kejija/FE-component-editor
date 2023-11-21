import DataTable from 'react-data-table-component';
import { Text, useMantineColorScheme, Card } from '@mantine/core';

const common_columns = [
  {
    name: 'ID',
    selector: (row) => row.id,
  },
  {
    name: 'Name',
    selector: (row) => row.label,
  },
  {
    name: 'Type',
    selector: (row) => row.parameter_type,
    cell: (row) => <Text size="xl">{row.id}</Text>
  },
  {
    name: 'Description',
    selector: (row) => row.description,
  }
]

const columns = {
  inputs: [
    ...common_columns
  ],
  outputs: [
    ...common_columns,
    {
      name: 'Formula',
      selector: (row) => row.formula,
    }
  ],
  parameters: [
    ...common_columns,
    {
      name: 'Default Value',
      selector: (row) => row.default_value,
    },
    {
      name: 'Default Unit',
      selector: (row) => row.default_unit,
    }
  ]
}

export function TableEditor(props) {
  let componentData = []
  try { componentData = JSON.parse(props.componentData) }
  catch
  { componentData = [] }

  // this only resets color scheme on data change - not theme change - this is fine for this tool
  const colorScheme = localStorage.getItem('mantine-color-scheme-value') || 'light'

  return (<div>
    <Card p={3} mb={5} withBorder>
      <Text px={10}>OUTPUTS</Text>
      <DataTable theme={colorScheme} dense columns={columns.outputs} data={componentData.outputs} />
    </Card>
    <Card px={3} mb={5} withBorder>
      <Text px={10}>INPUTS</Text>
      <DataTable theme={colorScheme} dense columns={columns.inputs} data={componentData.inputs} />
    </Card>
    <Card px={3} mb={5} withBorder>
      <Text px={10}>PARAMETERS</Text>
      <DataTable theme={colorScheme} dense columns={columns.parameters} data={componentData.parameters} />
    </Card>
  </div>)

}
