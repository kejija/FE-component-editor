import { TextInput, Checkbox } from '@mantine/core';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { datasheets } from '../demoData';

function DataSheetSelector(props) {
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState('');
  const [selectedRows, setSelectedRows] = useState(props.datasheetIDs);

  const tempFilteredItems: any[] = [];

  const columns = [
    {
      name: '',
      selector: row => <Checkbox
        checked={selectedRows.includes(row.id)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedRows([...selectedRows, row.id]);
          } else {
            setSelectedRows(selectedRows.filter((id) => id !== row.id));
          }
        }}
      />,
    },
    {
      name: 'name',
      selector: row => row.name,
    },
    {
      name: 'manufacture',
      selector: row => row.manufacture,
    },
    {
      name: 'manufactureModelNumber',
      selector: row => row.manufactureModelNumber,
    }
  ];

  useEffect(() => {
    datasheets.forEach((datasheet) => {
      const datasheet_string = `${datasheet.name} ${datasheet.description} ${datasheet.manufacture} ${datasheet.manufactureModelNumber}`;
      if (datasheet_string.toLowerCase().includes(filterText.toLowerCase())) {
        tempFilteredItems.push(datasheet);
      }
    });
    setFilteredItems(tempFilteredItems);
  }, [filterText]);

  return (
    <>
      <TextInput pb="10" description="Search" value={filterText} onChange={(e) => setFilterText(e.target.value)} />

      <DataTable
        columns={columns}
        data={filteredItems}
        dense
        fixedHeader
        fixedHeaderScrollHeight="300px"
        responsive
        subHeaderWrap
        theme="dark"
      />
    </>
  );
}

export default DataSheetSelector;
