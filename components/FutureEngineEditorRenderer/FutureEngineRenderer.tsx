'use client';

// renders a component from JSON
import {
  Card,
  Group,
  Center,
  Flex,
  Divider,
  Select,
  SegmentedControl,
  Button,
} from '@mantine/core';
import './component.css';

import { useState, useEffect } from 'react';
import { CSVDownload, CSVLink } from 'react-csv';

import SvelteJSONEditor from './JSONeditor/VJSONEditor';

import ComponentPreview from './ComponentPreviewRenderer';

import useStore from './ComponentStore';

export function FutureEngineRenderer() {
  const { DBcomponents, setComponentsData, addNewComponent, addParam } = useStore();

  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);
  const [currentMode, setCurrentMode] = useState('Editor');

  const [componentNamesList, setComponentNamesList] = useState([]);

  useEffect(() => {
    console.log('components updated', DBcomponents);
    const componentNames: { label: string; value: string }[] = DBcomponents.map(
      (component, index) => ({
        label: component.name,
        value: index.toString(),
      })
    );
    setComponentNamesList(componentNames as any);
  }, [DBcomponents]);

  function ControlsRowRenderer() {
    return (
      <Group p={0}>
        <Card p={2.5} bg="none">
          <Divider
            p={0}
            m={0}
            size="xs"
            style={{ zoom: 0.25 }}
            label={`Mode Selector ID: ${selectedComponentIndex}`}
            labelPosition="center"
          />
          <Group>
            <SegmentedControl
              size="xs"
              data={['Editor', 'JSON', 'Viewer']}
              value={currentMode}
              onChange={setCurrentMode}
            />
            <Select
              size="xs"
              allowDeselect={false}
              w={250}
              data={componentNamesList}
              value={selectedComponentIndex.toString()}
              onChange={setSelectedComponentIndex}
              searchable
            />
          </Group>
        </Card>
        <Card p={2.5} bg="none">
          <Divider
            p={0}
            m={0}
            size="xs"
            style={{ zoom: 0.25 }}
            label="Add New To JSON"
            labelPosition="center"
          />

          <Button.Group>
            <Button
              variant="default"
              onClick={() => {
                addNewComponent();
                setSelectedComponentIndex(DBcomponents.length.toString());
              }}
              size="xs"
              disabled={currentMode !== 'Editor'}
            >
              Component
            </Button>
            {
              // add three buttons from this list: ['inputs', 'parameters', 'outputs']
              ['parameters', 'outputs'].map((paramType) => (
                <Button
                  onClick={() => {
                    addParam(paramType, parseInt(selectedComponentIndex, 10));
                  }}
                  variant="default"
                  size="xs"
                  disabled={currentMode !== 'Editor'}
                >
                  {paramType}
                </Button>
              ))
            }
          </Button.Group>
        </Card>
        <Card p={2.5} bg="none">
          <Divider
            p={0}
            m={0}
            size="xs"
            style={{ zoom: 0.25 }}
            label="DB Control"
            labelPosition="center"
          />
          <Button.Group>
            <Button variant="default" size="xs">
              Reset
            </Button>
            <Button variant="default" size="xs" disabled={currentMode === 'Viewer'}>
              Save DB
            </Button>
            <CSVLink data={DBcomponents} target="_blank">
              <Button variant="default" size="xs" disabled={currentMode === 'Viewer'}>
                Export CSV
              </Button>
            </CSVLink>
          </Button.Group>
        </Card>
      </Group>
    );
  }

  return (
    <div>
      <Center py={20}>
        {/* title  */} <ControlsRowRenderer />
      </Center>

      <Flex gap="md" justify="center">
        <Card w={currentMode === 'Editor' ? 900 : 350} bg="none" pb={50} pt={0}>
          <ComponentPreview
            componentData={DBcomponents[selectedComponentIndex]}
            mode={currentMode}
            componentID={selectedComponentIndex}
          />
        </Card>
        <Card
          py="0"
          bg="none"
          pl="0"
          ml="-25px"
          w={450}
          // h={500}
          radius={0}
          style={currentMode === 'JSON' ? {} : { display: 'none' }}
        >
          <SvelteJSONEditor
            content={{ json: DBcomponents[selectedComponentIndex] }}
            onChange={(e) => {
              const newComponents = DBcomponents;
              newComponents[selectedComponentIndex] = e.json;
              setComponentsData(newComponents);
            }}
          />
        </Card>
      </Flex>
    </div>
  );
}
