import { AsButtonNavigation } from '@/navigation/as-button-navigation.tsx';
import { AsButtonListNavigation } from '@/navigation/as-button-list-navigation.tsx';
import { AsLabeledButtonListNavigation } from '@/navigation/as-labeled-button-list-navigation.tsx';
import type {
  NavigationItem,
  NavigationState,
  PriorityType,
  ScreenType,
} from '@/navigation/types/navigation.types.tsx';
import { navItemsUnauthenticated } from './nav-items/nav-items-unauthenticated.tsx';
import { useState } from 'react';
import { useScreenStore } from '@/global-state/screen.store.tsx';

export function DynamicNavigation({
  state,
  priority,
  screen,
  navigationItems = navItemsUnauthenticated,
  className = '',
  onStateChange: onStateChange,
  userName: userName,
  avatarUrl = '/placeholder-user.jpg',
  onUserClick: onUserClick,
  authenticated = true,
}: {
  state: NavigationState;
  priority: PriorityType;
  screen: ScreenType;
  navigationItems: NavigationItem[];
  className?: string;
  onStateChange?: (newState: NavigationState) => void;
  userName?: string;
  avatarUrl?: string;
  onUserClick?: () => void;
  authenticated?: boolean;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useScreenStore(state => state.isMobile);

  const isPrimary = priority === 'primary';
  const isMobileDevice = screen === 'mobile' || (screen === 'automatic' && isMobile);

  // Use authenticated status to determine which items to show
  const items = authenticated ? navigationItems : navItemsUnauthenticated;

  if (state === 'asButton') {
    return (
      <AsButtonNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobileDevice}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        state={state}
        onStateChange={onStateChange}
        className={className}
        authenticated={authenticated}
        userName={userName}
        avatarUrl={avatarUrl}
        onUserClick={onUserClick}
      />
    );
  }

  if (state === 'asButtonList') {
    return (
      <AsButtonListNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        state={state}
        onStateChange={onStateChange}
        priority={priority}
        className={className}
        authenticated={authenticated}
        userName={userName}
        avatarUrl={avatarUrl}
        onUserClick={onUserClick}
      />
    );
  }

  if (state === 'asLabeledButtonList') {
    return (
      <AsLabeledButtonListNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobileDevice}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        state={state}
        onStateChange={onStateChange}
        priority={priority}
        className={className}
        authenticated={authenticated}
        userName={userName}
        avatarUrl={avatarUrl}
        onUserClick={onUserClick}
      />
    );
  }

  return null;
}
