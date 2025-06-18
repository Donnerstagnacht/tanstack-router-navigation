import { createFileRoute } from '@tanstack/react-router';
import NavigationDemo from '../navigation/NavigationDemo.tsx';
import { useScreenStore } from '@/global-state/screen.store.tsx';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const screenStore = useScreenStore();

  return (
    <NavigationDemo
      onScreenTypeChange={screenType => {
        screenStore.setScreen(screenType);
      }}
      onPriorityChange={priorityType => {
        screenStore.setPriority(priorityType);
      }}
    />
  );
}
