import * as React from "react"
import {
  Home,
  Settings,
  User,
  Mail,
  Search,
  Bell,
  Heart,
  Bookmark,
  LayoutDashboard,
  File,
  FolderOpen,
  Calendar,
  MessageSquare,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { AsButtonNavigation } from "@/components/navigation/as-button-navigation"
import { AsButtonListNavigation } from "@/components/navigation/as-button-list-navigation"
import { AsLabeledButtonListNavigation } from "@/components/navigation/as-labeled-button-list-navigation"

export type NavigationState = "asButton" | "asButtonList" | "asLabeledButtonList"
export type NavigationPriority = "primary" | "secondary"
export type NavigationScreen = "mobile" | "desktop" | "automatic"
export type Language = "en" | "de"
export type NavigationItem = {
  id: string
  icon: React.ComponentType<{ className?: string }> | string
  label: string
  href?: string
  onClick?: () => void
  badge?: number
}
type DynamicNavigationProps = {
  state: NavigationState
  priority: NavigationPriority
  screen: NavigationScreen
  navigationItems: NavigationItem[]
  className?: string
  onStateChange?: (newState: NavigationState) => void
  userName?: string
  avatarUrl?: string
  onUserClick?: () => void
  authenticated?: boolean
}

const unauthenticatedItems: NavigationItem[] = [
  { id: "home", icon: Home, label: "Home", href: "/" }
]

export function DynamicNavigation({
  state,
  priority,
  screen,
  navigationItems = unauthenticatedItems,
  className = "",
  onStateChange: onStateChange,
  userName: userName,
  avatarUrl = "/placeholder-user.jpg",
  onUserClick: onUserClick,
  authenticated = true,
}: DynamicNavigationProps) {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const [language, setLanguage] = React.useState<Language>("en")
  const [isExpanded, setIsExpanded] = React.useState(false)
  const isMobileDevice = useIsMobile()

  const isPrimary = priority === "primary"
  const isMobile = screen === "mobile" || (screen === "automatic" && isMobileDevice)
  
  // Map string icons to actual components
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home,
    Settings,
    User,
    Mail,
    Search,
    Bell,
    Heart,
    Bookmark,
    LayoutDashboard,
    File,
    FolderOpen,
    Calendar,
    MessageSquare,
  }
  
  // Process navigation items to ensure icon is a component
  const processedItems = navigationItems.map(item => {
    if (typeof item.icon === 'string' && iconMap[item.icon]) {
      return { ...item, icon: iconMap[item.icon] }
    }
    return item
  }) as Array<NavigationItem & { icon: React.ComponentType<{ className?: string }> }>
  
  // Use authenticated status to determine which items to show
  const items = authenticated ? processedItems : unauthenticatedItems

  if (state === "asButton") {
    return (
      <AsButtonNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobile}
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
        language={language}
        setLanguage={setLanguage}
      />
    )
  }

  if (state === "asButtonList") {
    return (
      <AsButtonListNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobile}
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
        language={language}
        setLanguage={setLanguage}
      />
    )
  }

  if (state === "asLabeledButtonList") {
    return (
      <AsLabeledButtonListNavigation
        items={items}
        isPrimary={isPrimary}
        isMobile={isMobile}
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
        language={language}
        setLanguage={setLanguage}
      />
    )
  }

  return null
}
