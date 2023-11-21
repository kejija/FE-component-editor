'use client';

import { Button, Center, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Center>
      <Button.Group>
        <Button size="xs" variant="default" onClick={() => setColorScheme('light')}>
          Light
        </Button>
        <Button size="xs" variant="default" onClick={() => setColorScheme('dark')}>
          Dark
        </Button>
        <Button size="xs" variant="default" onClick={() => setColorScheme('auto')}>
          Auto
        </Button>
      </Button.Group>
    </Center>
  );
}
