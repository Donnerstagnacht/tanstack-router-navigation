import * as React from 'react';
import { iconMap } from '@/lib/icons/icon-map';
import { AsButtonNavigation } from '@/components/navigation/as-button-navigation';
import { AsButtonListNavigation } from '@/components/navigation/as-button-list-navigation';
import { AsLabeledButtonListNavigation } from '@/components/navigation/as-labeled-button-list-navigation';
import type {
  NavigationItem,
  NavigationState,
  PriorityType,
  ScreenType,
} from '@/lib/navigation/NavigationTypes';
import { unauthenticatedItems } from '../../lib/navigation/unauthenticatedItems';
import { useScreenContext } from '@/contexts/screen-context';

export function DynamicNavigation({
  state,
  priority,
  screen,
  navigationItems = unauthenticatedItems,
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
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { isMobile } = useScreenContext();

  const isPrimary = priority === 'primary';
  const isMobileDevice = screen === 'mobile' || (screen === 'automatic' && isMobile);

  // Use the centralized icon map from lib/icons/icon-map
  // Process navigation items to ensure icon is a component using the centralized icon map
  const processedItems = navigationItems.map(item => {
    if (typeof item.icon === 'string' && iconMap[item.icon]) {
      return { ...item, icon: iconMap[item.icon] };
    }
    return item;
  });

  // Use authenticated status to determine which items to show
  const items = authenticated ? processedItems : unauthenticatedItems;

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
