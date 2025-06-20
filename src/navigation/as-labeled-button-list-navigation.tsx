import { cn } from '@/i18n/i18n.types.ts';
import { StateSwitcher } from '@/navigation/toggles/state-switcher.tsx';
import { NavItemList } from '@/navigation/nav-items/nav-item-list.tsx';
import { NavUserAvatar } from '@/navigation/nav-items/nav-user-avatar.tsx';
import { useRouter } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import type { NavigationProps, NavigationActions } from './types/navigation.types';

export function AsLabeledButtonListNavigation({
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
            navigationView="asLabeledButtonList"
            isMobile={true}
            isPrimary={isPrimary}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            currentRoute={currentRoute}
          />

          {isPrimary && <Separator orientation="vertical" className="mx-2 h-12" />}
          {authenticated && isPrimary && (
            <NavUserAvatar
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              navigationView="asLabeledButtonList"
              isMobile={true}
            />
          )}

          {onStateChange && isPrimary && (
            <div className="flex items-center gap-2 px-2">
              <StateSwitcher
                state={navigationView}
                onStateChange={onStateChange}
                isMobile={isMobile}
                navigationView="asLabeledButtonList"
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
        'bg-background fixed top-0 z-40 flex h-full w-64 flex-col border-r',
        isPrimary ? 'left-0' : 'right-0 border-r-0 border-l'
      )}
    >
      <div className="scrollbar-hide flex-1 overflow-y-auto p-4">
        <NavItemList
          navigationItems={navigationItems}
          navigationView="asLabeledButtonList"
          isMobile={false}
          isPrimary={isPrimary}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          currentRoute={currentRoute}
        />
      </div>

      <div className="flex-shrink-0 border-t">
        {authenticated && isPrimary && (
          <NavUserAvatar
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            navigationView="asLabeledButtonList"
            isMobile={false}
          />
        )}
        {isPrimary && (
          <div className="px-4 pb-4">
            <StateSwitcher
              state={navigationView}
              onStateChange={onStateChange}
              navigationView="asLabeledButtonList"
            />
          </div>
        )}
      </div>
    </div>
  );
}
