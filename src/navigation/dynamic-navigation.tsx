import { AsButtonNavigation } from '@/navigation/as-button-navigation.tsx';
import { AsButtonListNavigation } from '@/navigation/as-button-list-navigation.tsx';
import { AsLabeledButtonListNavigation } from '@/navigation/as-labeled-button-list-navigation.tsx';
import type {
  NavigationItem,
  NavigationView,
  NavigationType,
  ScreenType,
} from '@/navigation/types/navigation.types.tsx';
import { navItemsUnauthenticated } from './nav-items/nav-items-unauthenticated.tsx';
import { useState } from 'react';
import { useScreenStore } from '@/global-state/screen.store.tsx';

export function DynamicNavigation({
  navigationView,
  navigationType,
  screenType,
  navigationItems = navItemsUnauthenticated,
  onStateChange: onStateChange,
  authenticated = true,
}: {
  navigationView: NavigationView;
  navigationType: NavigationType;
  screenType: ScreenType;
  navigationItems: NavigationItem[];
  onStateChange?: (newState: NavigationView) => void;
  authenticated?: boolean;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useScreenStore(state => state.isMobileScreen);

  const isMobileDevice = screenType === 'mobile' || (screenType === 'automatic' && isMobile);

  // Use authenticated status to determine which items to show
  const items = authenticated ? navigationItems : navItemsUnauthenticated;

  if (navigationView === 'asButton') {
    return (
      <AsButtonNavigation
        navigationItems={items}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        navigationView={navigationView}
        authenticated={authenticated}
        navigationType={navigationType}
        onStateChange={onStateChange}
        setHoveredItem={setHoveredItem}
      />
    );
  }

  if (navigationView === 'asButtonList') {
    return (
      <AsButtonListNavigation
        navigationItems={items}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        navigationView={navigationView}
        onStateChange={onStateChange}
        navigationType={navigationType}
        authenticated={authenticated}
      />
    );
  }

  if (navigationView === 'asLabeledButtonList') {
    return (
      <AsLabeledButtonListNavigation
        navigationItems={items}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        navigationView={navigationView}
        onStateChange={onStateChange}
        navigationType={navigationType}
        authenticated={authenticated}
      />
    );
  }

  return null;
}
