'use client';

import { Center, SegmentedControl, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const colors = ['light', 'dark', 'auto'];

  return (
    <Center>
      <SegmentedControl
        size="xs"
        data={colors}
        value={colorScheme}
        onChange={(value) => setColorScheme(value as any)}
      />{' '}
    </Center>
  );
}
