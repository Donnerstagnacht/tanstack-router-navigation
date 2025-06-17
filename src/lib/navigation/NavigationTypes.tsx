export type ScreenType = 'mobile' | 'desktop' | 'automatic';

export type PriorityType = 'primary' | 'secondary' | 'combined';

export interface NavigationDemoProps {
  onScreenTypeChange?: (screenType: 'mobile' | 'desktop' | 'automatic') => void;
  onPriorityChange?: (priority: PriorityType) => void;
}
