import { cn } from '@/lib/utils';
import { StateSwitcher } from '@/components/navigation/toggles/state-switcher';
import { NavItemList } from '@/components/navigation/nav-items/nav-item-list';
import { NavUserAvatar } from '@/components/navigation/nav-items/nav-user-avatar';
import { useRouter } from '@tanstack/react-router';
import type { ListNavigationProps } from '@/lib/navigation/NavigationTypes';

export function AsLabeledButtonListNavigation({
  items,
  isPrimary,
  isMobile,
  hoveredItem,
  setHoveredItem,
  state,
  onStateChange,
  priority,
  className,
  authenticated,
  userName,
  avatarUrl,
  onUserClick,
}: ListNavigationProps) {
  const router = useRouter();
  const currentRoute = router.state.location.pathname;
  if (isMobile) {
    // Mobile: Bottom bar (primary) or Top bar (secondary) with carousel + expandable more menu
    return (
      <div
        className={cn(
          'bg-background fixed right-0 left-0 z-40',
          isPrimary ? 'bottom-0 border-t' : 'top-0 border-b',
          className
        )}
      >
        <div className="flex items-center py-2">
          {/* Scrollable navigation items */}
          <NavItemList
            items={items}
            variant="asLabeledButtonList"
            isMobile={true}
            isPrimary={isPrimary}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            currentRoute={currentRoute}
          />

          {/* Divider */}
          {isPrimary && <div className="bg-border mx-2 h-12 w-px" />}
          {/* User Avatar - For Mobile (positioned left of the state switcher) */}
          {authenticated && userName && isPrimary && (
            <NavUserAvatar
              userName={userName}
              avatarUrl={avatarUrl}
              onUserClick={onUserClick}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              variant="asLabeledButtonList"
              isMobile={true}
            />
          )}

          {/* Fixed Expandable State Switcher - Only shown for primary navigation */}
          {onStateChange && isPrimary && (
            <div className="flex items-center gap-2 px-2">
              <StateSwitcher
                state={state}
                onStateChange={onStateChange}
                isMobile={isMobile}
                variant="asLabeledButtonList"
                priority={priority}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop: Full sidebar with icons and labels
  return (
    <div
      className={cn(
        'bg-background fixed top-0 z-40 flex h-full w-64 flex-col border-r',
        isPrimary ? 'left-0' : 'right-0 border-r-0 border-l',
        className
      )}
    >
      {/* Main navigation items with vertical scrolling */}
      <div className="scrollbar-hide flex-1 overflow-y-auto p-4">
        <NavItemList
          items={items}
          variant="asLabeledButtonList"
          isMobile={false}
          isPrimary={isPrimary}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          currentRoute={currentRoute}
        />
      </div>

      {/* Footer section with single divider at the top */}
      <div className="flex-shrink-0 border-t">
        {/* User avatar and name - positioned right below the divider */}
        {authenticated && userName && isPrimary && (
          <NavUserAvatar
            userName={userName}
            avatarUrl={avatarUrl}
            onUserClick={onUserClick}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            variant="asLabeledButtonList"
            isMobile={false}
          />
        )}
        {/* State Switcher - Only shown for primary navigation (no additional border) */}
        {onStateChange && isPrimary && (
          <div className="px-4 pb-4">
            <StateSwitcher
              state={state}
              onStateChange={onStateChange}
              variant="asLabeledButtonList"
            />
          </div>
        )}
      </div>
    </div>
  );
}
