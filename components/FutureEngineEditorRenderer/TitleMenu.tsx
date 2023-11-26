import { Group, Menu, Text, ActionIcon, rem } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';

interface TitleMenu {
  component: {
    name: string;
    category: string;
  };
}
export const TitleMenu = (props: TitleMenu) => (
  <Group justify="space-between">
    <Text>{props.component.name}</Text>
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <IconDots style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconFileZip style={{ width: rem(14), height: rem(14) }} />}>
          Duplicate
        </Menu.Item>
        <Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}>
          Preview CAD
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          color="red"
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </Group>
);
