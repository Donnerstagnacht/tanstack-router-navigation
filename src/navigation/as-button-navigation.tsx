import { Home, X } from 'lucide-react';
import { cn } from '@/i18n/i18n.types.ts';
import { Button } from '@/components/ui/button.tsx';
import { StateSwitcher } from '@/navigation/toggles/state-switcher.tsx';
import { NavItemList } from '@/navigation/nav-items/nav-item-list.tsx';
import { NavUserAvatar } from '@/navigation/nav-items/nav-user-avatar.tsx';
import type { AsButtonNavigationProps } from '@/navigation/types/navigation.types.tsx';
import { useRouter } from '@tanstack/react-router';

export function AsButtonNavigation({
  items,
  isPrimary,
  isMobile,
  isExpanded,
  setIsExpanded,
  hoveredItem,
  setHoveredItem,
  state,
  onStateChange,
  className,
  authenticated,
  userName,
  avatarUrl,
}: AsButtonNavigationProps) {
  const router = useRouter();
  const currentRoute = router.state.location.pathname;

  return (
    <>
      {/* Main navigation button - hidden when overlay is open */}
      {!isExpanded && (
        <NavButton
          isPrimary={isPrimary}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          className={className}
        />
      )}

      {/* Fullscreen Overlay */}
      {isExpanded && (
        <div
          className="bg-background/95 fixed inset-0 z-50 backdrop-blur-sm"
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => setIsExpanded(false)}
        >
          {/* Close button - positioned based on priority */}
          <CloseButton isPrimary={isPrimary} onClose={() => setIsExpanded(false)} />
          <div className="flex h-full items-center justify-center">
            <div className="flex w-full max-w-3xl flex-col items-center px-6">
              <NavItemList
                items={items}
                variant="asButton"
                isMobile={isMobile}
                isPrimary={isPrimary}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
                currentRoute={currentRoute}
              />
              {/* User Avatar and Name Button - Full width below menu grid */}
              {authenticated && userName && isPrimary && (
                <NavUserAvatar
                  userName={userName}
                  avatarUrl={avatarUrl}
                  className="mt-8"
                  variant="asButton"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                />
              )}
            </div>
          </div>
          {/* State Switcher in Overlay - Only shown for primary navigation */}
          {isPrimary && onStateChange && (
            <StateSwitcher state={state} onStateChange={onStateChange} variant="asButton" />
          )}
        </div>
      )}
    </>
  );
}

export function NavButton({
  isPrimary,
  isExpanded,
  setIsExpanded,
  className,
  icon = <Home className="h-6 w-6" />,
}: {
  isPrimary: boolean;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn(
        'fixed bottom-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110',
        isPrimary ? 'left-6' : 'right-6',
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {icon}
    </Button>
  );
}

export function CloseButton({
  isPrimary,
  onClose,
  className,
}: {
  isPrimary: boolean;
  onClose: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute top-6 z-50 h-10 w-10 rounded-full shadow-md',
        isPrimary ? 'right-6' : 'left-6', // Right if primary, Left if secondary
        className
      )}
      onClick={onClose}
    >
      <X className="h-4 w-4" />
    </Button>
  );
}
