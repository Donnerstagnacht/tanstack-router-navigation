import { cn } from '@/i18n/i18n.types.ts';
import { StateSwitcher } from '@/navigation/toggles/state-switcher.tsx';
import { NavItemList } from '@/navigation/nav-items/nav-item-list.tsx';
import { NavUserAvatar } from '@/navigation/nav-items/nav-user-avatar.tsx';
import { useRouter } from '@tanstack/react-router';
import type { NavigationProps, NavigationActions } from './types/navigation.types';

export function AsButtonListNavigation({
  navigationItems,
  navigationView,
  navigationType,
  isMobile,
  hoveredItem,
  authenticated,
  onStateChange,
  setHoveredItem,
}: NavigationProps & NavigationActions) {
  const router = useRouter();
  const currentRoute = router.state.location.pathname;
  const isPrimary = navigationType === 'primary';

  if (isMobile) {
    return (
      <div
        className={cn(
          'bg-background fixed right-0 left-0 z-40',
          isPrimary ? 'bottom-0 border-t' : 'top-0 border-b'
        )}
      >
        <div className="flex items-center py-2">
          <NavItemList
            navigationItems={navigationItems}
            navigationView="asButtonList"
            isMobile={isMobile}
            hoveredItem={hoveredItem}
            isPrimary={isPrimary}
            currentRoute={currentRoute}
            setHoveredItem={setHoveredItem}
          />
          {/* Divider */}
          {isPrimary && <div className={cn('bg-border mx-2 w-px', isPrimary ? 'h-8' : 'h-8')} />}
          {authenticated && isPrimary && (
            <NavUserAvatar
              id="user-avatar-mobile"
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              navigationView="asButtonList"
              isMobile={isMobile}
            />
          )}
          {onStateChange && isPrimary && (
            <div className="flex items-center gap-2 px-2">
              <StateSwitcher
                state={navigationView}
                onStateChange={onStateChange}
                isMobile={isMobile}
                navigationView="asButtonList"
                navigationType={navigationType}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div
      className={cn(
        'bg-background fixed top-0 z-40 flex h-full w-16 flex-col border-r',
        isPrimary ? 'left-0' : 'right-0 border-r-0 border-l'
      )}
    >
      {isPrimary ? (
        <>
          <div className="scrollbar-hide flex-1 overflow-y-auto py-4">
            <NavItemList
              navigationItems={navigationItems}
              navigationView="asButtonList"
              isMobile={isMobile}
              isPrimary={isPrimary}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              currentRoute={currentRoute}
            />
          </div>
          <div className="flex-shrink-0 border-t">
            <div className="flex flex-col items-center gap-2 p-2">
              {authenticated && (
                <NavUserAvatar
                  id="user-avatar"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  isMobile={isMobile}
                  navigationView="asButtonList"
                />
              )}
              {onStateChange && (
                <div className="flex flex-col items-center gap-2">
                  <StateSwitcher
                    state={navigationView}
                    isMobile={isMobile}
                    onStateChange={onStateChange}
                    navigationView="asButtonList"
                    navigationType={navigationType}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="scrollbar-hide flex-1 overflow-y-auto py-4">
          <NavItemList
            navigationItems={navigationItems}
            navigationView="asButtonList"
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
