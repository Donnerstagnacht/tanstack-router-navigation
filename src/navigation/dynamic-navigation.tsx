import { AsButtonNavigation } from '@/navigation/as-button-navigation.tsx';
import { AsButtonListNavigation } from '@/navigation/as-button-list-navigation.tsx';
import { AsLabeledButtonListNavigation } from '@/navigation/as-labeled-button-list-navigation.tsx';
import type {
  NavigationItem,
  NavigationView,
  NavigationType,
  ScreenType,
} from '@/navigation/types/navigation.types.tsx';
import { useState } from 'react';
import { useScreenStore } from '@/global-state/screen.store.tsx';

export function DynamicNavigation({
  navigationView,
  navigationType,
  screenType,
  navigationItems,
  authenticated,
  onStateChange,
}: {
  navigationView: NavigationView;
  navigationType: NavigationType;
  screenType: ScreenType;
  navigationItems: NavigationItem[];
  authenticated: boolean;
  onStateChange: (newState: NavigationView) => void;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useScreenStore(state => state.isMobileScreen);

  const isMobileDevice = screenType === 'mobile' || (screenType === 'automatic' && isMobile);

  if (navigationView === 'asButton') {
    return (
      <AsButtonNavigation
        navigationItems={navigationItems}
        navigationView={navigationView}
        navigationType={navigationType}
        authenticated={authenticated}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        onStateChange={onStateChange}
        setHoveredItem={setHoveredItem}
      />
    );
  }

  if (navigationView === 'asButtonList') {
    return (
      <AsButtonListNavigation
        navigationItems={navigationItems}
        navigationView={navigationView}
        navigationType={navigationType}
        authenticated={authenticated}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        onStateChange={onStateChange}
      />
    );
  }

  if (navigationView === 'asLabeledButtonList') {
    return (
      <AsLabeledButtonListNavigation
        navigationItems={navigationItems}
        navigationView={navigationView}
        navigationType={navigationType}
        authenticated={authenticated}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        onStateChange={onStateChange}
      />
    );
  }

  return null;
}
