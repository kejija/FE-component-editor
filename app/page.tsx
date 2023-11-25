import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ComponentRenderer } from '../components/ComponentRenderer/ComponentRenderer';
import { Flex } from '@mantine/core';

export default function HomePage() {
  return (
    <div>
      <Flex gap={10} justify="center">
        <Welcome />
        <ColorSchemeToggle />
      </Flex>

      <ComponentRenderer />
    </div>
  );
}
