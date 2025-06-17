import * as React from "react"
import { Home, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StateSwitcher } from "@/components/navigation/toggles/state-switcher"
import { NavItemList } from "@/components/navigation/nav-items/nav-item-list"
import { NavUserAvatar } from "@/components/navigation/nav-items/nav-user-avatar"
import type { NavigationItem, NavigationState } from "./dynamic-navigation"
import { useRouter } from "@tanstack/react-router"

interface AsButtonNavigationProps {
  items: NavigationItem[];
  isPrimary: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  state: NavigationState;
  onStateChange?: (newState: NavigationState) => void;
  className?: string;
  authenticated?: boolean;
  userName?: string;
  avatarUrl?: string;
  onUserClick?: () => void;
}

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
  onUserClick
}: AsButtonNavigationProps) {  const router = useRouter()
  const currentRoute = router.state.location.pathname
  
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
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => setIsExpanded(false)}
        >
          {/* Close button - positioned based on priority */}
          <CloseButton
            isPrimary={isPrimary}
            onClose={() => setIsExpanded(false)}
          />
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center max-w-3xl w-full px-6">              <NavItemList
                items={items}
                variant="asButton"
                isMobile={isMobile}
                isPrimary={isPrimary}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
                currentRoute={currentRoute}
              />{/* User Avatar and Name Button - Full width below menu grid */}
              {authenticated && userName && isPrimary && (
                <NavUserAvatar
                  userName={userName}
                  avatarUrl={avatarUrl}
                  onClick={onUserClick}
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
            <StateSwitcher
              state={state}
              onStateChange={onStateChange}
              variant="asButton"
            />
          )}
        </div>
      )}
    </>
  )
}

// Navigation button component extracted for reuse
type NavButtonProps = {
  isPrimary: boolean;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  className?: string;
  icon?: React.ReactNode;
}

export function NavButton({
  isPrimary,
  isExpanded,
  setIsExpanded,
  className,
  icon = <Home className="h-6 w-6" />
}: NavButtonProps) {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn(
        "fixed bottom-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
        isPrimary ? "left-6" : "right-6",
        className,
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {icon}
    </Button>
  );
}

// AvatarButton has been refactored into NavUserAvatar component
// with the "asButton" variant

// Close Button component for overlay
interface CloseButtonProps {
  isPrimary: boolean;
  onClose: () => void;
  className?: string;
}

export function CloseButton({
  isPrimary,
  onClose,
  className
}: CloseButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute top-6 z-50 h-10 w-10 rounded-full shadow-md",
        isPrimary ? "right-6" : "left-6", // Right if primary, Left if secondary
        className
      )}
      onClick={onClose}
    >
      <X className="h-4 w-4" />
    </Button>
  );
}