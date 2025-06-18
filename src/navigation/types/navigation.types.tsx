import type { IconName } from '../nav-items/icon-map';

export type ScreenType = 'mobile' | 'desktop' | 'automatic';

export type PriorityType = 'primary' | 'secondary' | 'combined';

export type NavigationState = 'asButton' | 'asButtonList' | 'asLabeledButtonList';

export type Size = 'default' | 'small';

export interface NavigationItem {
  id: string;
  icon: IconName;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
}

// Core shared navigation props
export interface BaseNavigationProps {
  items: NavigationItem[];
  isPrimary: boolean;
  isMobile: boolean;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  state: NavigationState;
  onStateChange?: (newState: NavigationState) => void;
  className?: string;
  authenticated?: boolean;
  onUserClick?: () => void;
}

// Specific props for AsButton navigation
export type AsButtonNavigationProps = BaseNavigationProps & {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
};

// Specific props for list-type navigations
export type ListNavigationProps = BaseNavigationProps & {
  priority: PriorityType;
};

/**
 * Shortcut representation with display text and keys array
 */
export interface KeyboardShortcut {
  display: string;
  keys: string[];
}
