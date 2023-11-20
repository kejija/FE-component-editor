import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ComponentRenderer } from '../components/ComponentRenderer/ComponentRenderer';

export default function HomePage() {
  return (
    <div>
      <Welcome />
      <ColorSchemeToggle />
      <ComponentRenderer />
    </div>
  );
}
