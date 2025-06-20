import { createFileRoute } from '@tanstack/react-router';
import NavigationDemo from '../navigation/NavigationDemo.tsx';
import { useScreenStore } from '@/global-state/screen.store.tsx';
import { useNavigationStore } from '@/navigation/state/navigation.store.tsx';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const screenStore = useScreenStore();
  const navigationStore = useNavigationStore();

  return (
    <NavigationDemo
      onScreenTypeChange={screenType => {
        screenStore.setScreenType(screenType);
      }}
      onPriorityChange={priorityType => {
        navigationStore.setNavigationType(priorityType);
      }}
    />
  );
}
