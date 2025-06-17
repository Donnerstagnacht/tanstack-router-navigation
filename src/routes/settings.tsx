import { createFileRoute } from '@tanstack/react-router';
import NavigationDemo from '../components/NavigationDemo';
import { useScreenContext } from '../contexts/screen-context';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const screenContext = useScreenContext();

  return (
    <NavigationDemo
      onScreenTypeChange={screenType => {
        screenContext.setScreen(screenType);
      }}
      onPriorityChange={priorityType => {
        screenContext.setPriority(priorityType);
      }}
    />
  );
}
