import { createFileRoute } from '@tanstack/react-router';
import NavigationDemo from '../components/NavigationDemo';
import { useScreenContext } from '../contexts/screen-context';

export const Route = createFileRoute('/settings')({
  component: () => {
    const { setScreen, setPriority } = useScreenContext();

    return (
      <NavigationDemo
        onScreenTypeChange={screenType => {
          setScreen(screenType);
        }}
        onPriorityChange={priorityType => {
          setPriority(priorityType);
        }}
      />
    );
  },
});
