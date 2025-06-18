import { cn } from '@/i18n/i18n.types.ts';
import { StateSwitcher } from '@/navigation/toggles/state-switcher.tsx';
import { NavItemList } from '@/navigation/nav-items/nav-item-list.tsx';
import { NavUserAvatar } from '@/navigation/nav-items/nav-user-avatar.tsx';
import { useRouter } from '@tanstack/react-router';
import type { ListNavigationProps } from '@/navigation/types/navigation.types.tsx';

export function AsButtonListNavigation({
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
            variant="asButtonList"
            isMobile={isMobile}
            isPrimary={isPrimary}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            currentRoute={currentRoute}
          />
          {/* Divider */}
          {isPrimary && <div className={cn('bg-border mx-2 w-px', isPrimary ? 'h-8' : 'h-8')} />}
          {/* User Avatar - For Mobile (positioned left of the state switcher) */}
          {authenticated && isPrimary && (
            <NavUserAvatar
              id="user-avatar-mobile"
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              variant="asButtonList"
              isMobile={isMobile}
            />
          )}
          {/* Fixed Expandable State Switcher - Only shown for primary navigation */}
          {onStateChange && isPrimary && (
            <div className="flex items-center gap-2 px-2">
              <StateSwitcher
                state={state}
                onStateChange={onStateChange}
                isMobile={isMobile}
                variant="asButtonList"
                priority={priority}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop: Side bar with icons and popover labels
  return (
    <div
      className={cn(
        'bg-background fixed top-0 z-40 flex h-full w-16 flex-col border-r',
        isPrimary ? 'left-0' : 'right-0 border-r-0 border-l',
        className
      )}
    >
      {isPrimary ? (
        // Primary Navigation (links) - with vertical scrolling
        <>
          <div className="scrollbar-hide flex-1 overflow-y-auto py-4">
            <NavItemList
              items={items}
              variant="asButtonList"
              isMobile={isMobile}
              isPrimary={isPrimary}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              currentRoute={currentRoute}
            />
          </div>
          <div className="flex-shrink-0 border-t">
            <div className="flex flex-col items-center gap-2 p-2">
              {/* User Avatar */}
              {authenticated && (
                <NavUserAvatar
                  id="user-avatar"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  isMobile={isMobile}
                  variant="asButtonList"
                />
              )}
              {/* Expandable State Switcher */}
              {onStateChange && (
                <div className="flex flex-col items-center gap-2">
                  <StateSwitcher
                    state={state}
                    isMobile={isMobile}
                    onStateChange={onStateChange}
                    variant="asButtonList"
                    priority={priority}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        // Secondary Navigation (rechts) - with vertical scrolling
        <div className="scrollbar-hide flex-1 overflow-y-auto py-4">
          <NavItemList
            items={items}
            variant="asButtonList"
            isMobile={false}
            isPrimary={isPrimary}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            currentRoute={currentRoute}
          />
        </div>
      )}
    </div>
  );
}
