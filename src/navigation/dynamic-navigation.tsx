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
  className = '',
  onStateChange: onStateChange,
  authenticated = true,
}: {
  navigationView: NavigationView;
  navigationType: NavigationType;
  screenType: ScreenType;
  navigationItems: NavigationItem[];
  className?: string;
  onStateChange?: (newState: NavigationView) => void;
  authenticated?: boolean;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useScreenStore(state => state.isMobileScreen);

  const isPrimary = navigationType === 'primary';
  const isMobileDevice = screenType === 'mobile' || (screenType === 'automatic' && isMobile);

  // Use authenticated status to determine which items to show
  const items = authenticated ? navigationItems : navItemsUnauthenticated;

  if (navigationView === 'asButton') {
    return (
      <AsButtonNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobileDevice}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        state={navigationView}
        onStateChange={onStateChange}
        className={className}
        authenticated={authenticated}
      />
    );
  }

  if (navigationView === 'asButtonList') {
    return (
      <AsButtonListNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        state={navigationView}
        onStateChange={onStateChange}
        priority={navigationType}
        className={className}
        authenticated={authenticated}
      />
    );
  }

  if (navigationView === 'asLabeledButtonList') {
    return (
      <AsLabeledButtonListNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        state={navigationView}
        onStateChange={onStateChange}
        priority={navigationType}
        className={className}
        authenticated={authenticated}
      />
    );
  }

  return null;
}
