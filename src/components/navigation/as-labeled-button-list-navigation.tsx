"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { StateSwitcher } from "@/components/navigation/toggles/state-switcher"
import { NavItemList } from "@/components/navigation/nav-items/nav-item-list"
import { NavUserAvatar } from "@/components/navigation/nav-items/nav-user-avatar"
import type { NavigationItem, NavigationState, NavigationPriority, Language } from "./dynamic-navigation"
import { useRouter } from "@tanstack/react-router"

interface AsLabeledButtonListNavigationProps {
  items: NavigationItem[];
  isPrimary: boolean;
  isMobile: boolean;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  state: NavigationState;
  onStateChange?: (newState: NavigationState) => void;
  priority: NavigationPriority;
  className?: string;
  authenticated?: boolean;
  userName?: string;
  avatarUrl?: string;
  onUserClick?: () => void;language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

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
  language,
  setLanguage,
}: AsLabeledButtonListNavigationProps) {
  const router = useRouter()
  const currentRoute = router.state.location.pathname
  if (isMobile) {
    // Mobile: Bottom bar (primary) or Top bar (secondary) with carousel + expandable more menu
    return (
      <div
        className={cn(
          "fixed left-0 right-0 z-40 bg-background",
          isPrimary ? "bottom-0 border-t" : "top-0 border-b",
          className,
        )}
      >
        <div className="flex items-center py-2">
          {/* Scrollable navigation items */}          <NavItemList
            items={items}
            variant="asLabeledButtonList"
            isMobile={true}
            isLeft={isPrimary}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            currentRoute={currentRoute}
          />

          {/* Divider */}
          {
            isPrimary && <div className="w-px bg-border h-12 mx-2" />
          }
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
            <div className="px-2 flex items-center gap-2">
              <StateSwitcher
                state={state}
                onStateChange={onStateChange}
                isMobile={isMobile}
                variant="asLabeledButtonList"
                priority={priority}
                language={language}
                setLanguage={setLanguage}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
    
  // Desktop: Full sidebar with icons and labels
  return (
    <div
      className={cn(
        "fixed top-0 z-40 flex h-full w-64 flex-col border-r bg-background",
        isPrimary ? "left-0" : "right-0 border-l border-r-0",
        className,
      )}
    >
      {/* Main navigation items with vertical scrolling */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">        <NavItemList
          items={items}
          variant="asLabeledButtonList"
          isMobile={false}
          isLeft={isPrimary}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          currentRoute={currentRoute}
        />
      </div>

      {/* Footer section with single divider at the top */}
      <div className="border-t flex-shrink-0">        {/* User avatar and name - positioned right below the divider */}
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
        )}        {/* State Switcher - Only shown for primary navigation (no additional border) */}
        {onStateChange && isPrimary && (
          <div className="px-4 pb-4">
            <StateSwitcher
              state={state}
              onStateChange={onStateChange}
              language={language}
              setLanguage={setLanguage}
              variant="asLabeledButtonList"
            />
          </div>
        )}
      </div>
    </div>
  )
}
