import * as React from 'react'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import type { NavigationItem } from '../dynamic-navigation'

// Helper function to determine if an item is active
function isItemActive(item: NavigationItem, currentRoute?: string): boolean {
  if (!currentRoute) return false
  
  // Direct match with href if available
  if (item.href && currentRoute === item.href) {
    return true
  }
  
  // Extract route from onClick function string representation
  if (item.onClick) {
    try {
      const onClickStr = item.onClick.toString()
      // Look for navigation patterns like "navigate({ to: '/route' })" or "router.navigate({ to: '/route' })"
      const routeMatch = onClickStr.match(/to:\s*['"]([^'"]+)['"]\s*}/)
      if (routeMatch && routeMatch[1] === currentRoute) {
        return true
      }
    } catch (e) {
      // Ignore errors from toString conversion
    }
  }
  
  // ID-based matching as fallback (for common routes like 'home' -> '/')
  if (item.id === 'home' && currentRoute === '/') {
    return true
  }
  
  // Match route name with ID
  const routePath = currentRoute.startsWith('/') ? currentRoute.slice(1) : currentRoute
  if (routePath === item.id) {
    return true
  }
  
  return false
}

interface NavItemListProps {
  items: NavigationItem[]
  variant: 'asButton' | 'asButtonList' | 'asLabeledButtonList'
  isMobile: boolean
  isLeft: boolean  // Used for determining popover position and other layout decisions
  hoveredItem: string | null
  setHoveredItem: (id: string | null) => void
  className?: string
  currentRoute?: string  // Path of the current route to highlight active item
}

export function NavItemList({
  items,
  variant,
  isMobile,
  isLeft,
  hoveredItem,
  setHoveredItem,
  className,
  currentRoute
}: NavItemListProps) {
  
  // For debugging - log the current route
  React.useEffect(() => {
    console.log('Variant:', variant, 'Current route:', currentRoute || 'undefined');
    items.forEach((item) => {
      const isActive = isItemActive(item, currentRoute);
      console.log(`Item ${item.id}:`, { 
        isActive, 
        href: item.href || 'not set',
        currentRoute,
        onClick: item.onClick ? 'defined' : 'not defined'
      });
    });
  }, [currentRoute, items, variant]);
  
  // asButton variant - Grid layout of large buttons used in overlay
  if (variant === 'asButton') {
    return (
      <div className="overflow-y-auto scrollbar-hide max-h-[70vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-max gap-8 w-full p-4">
          {/* Use different layout for fewer items */}
          {items.length <= 4 ? (
            <div className="col-span-full flex flex-wrap justify-center gap-8">
              {items.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"                  
                  className={cn(
                    "h-24 w-24 flex-col gap-2 hover:bg-accent flex-shrink-0 relative",
                    isItemActive(item, currentRoute) && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setHoveredItem(null); // Reset hover state after click
                  }}
                >
                  <item.icon className={cn("h-8 w-8", isItemActive(item, currentRoute) && "text-primary")} />
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center" 
                      variant="default"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          ) : (
            // Original layout for 5+ items
            items.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "h-24 w-24 flex-col gap-2 hover:bg-accent flex-shrink-0 relative",
                  isItemActive(item, currentRoute) && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setHoveredItem(null); // Reset hover state after click
                }}
              >
                <item.icon className={cn("h-8 w-8", isItemActive(item, currentRoute) && "text-primary")} />
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <Badge 
                    className="absolute top-2 right-4 h-5 w-5 p-0 flex items-center justify-center" 
                    variant="default"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))
          )}
        </div>
      </div>
    )
  }
  
  // asButtonList variant - Mobile: Horizontal scrolling buttons with popovers
  if (variant === 'asButtonList' && isMobile) {
    return (
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-center gap-1 px-2 min-w-max">
          {items.map((item) => (
            <Popover key={item.id} open={hoveredItem === item.id}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-12 w-12 hover:bg-accent flex-shrink-0 relative",
                    isItemActive(item, currentRoute) && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setHoveredItem(null); // Reset hover state after click
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onTouchStart={() => setHoveredItem(item.id)}
                  onTouchEnd={() => setHoveredItem(null)}
                >
                  <item.icon className={cn("h-5 w-5", isItemActive(item, currentRoute) && "text-primary")} />
                  {item.badge && (
                    <Badge 
                      className="absolute -top-0 -right-1 h-5 w-5 p-0 flex items-center justify-center" 
                      variant="default"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-auto p-2" sideOffset={8}>
                <span className="text-sm font-medium">{item.label}</span>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    )
  }
  
  // asButtonList variant - Desktop: Vertical sidebar with icon buttons and popovers
  if (variant === 'asButtonList' && !isMobile) {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        {items.map((item) => (
          <Popover key={item.id} open={hoveredItem === item.id}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-12 w-12 hover:bg-accent flex-shrink-0 relative",
                  isItemActive(item, currentRoute) && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setHoveredItem(null); // Reset hover state after click
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon className={cn("h-5 w-5", isItemActive(item, currentRoute) && "text-primary")} />
                {item.badge && (
                  <Badge 
                    className="absolute -top-0 -right-1 h-5 w-5 p-0 flex items-center justify-center" 
                    variant="default"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent side={isLeft ? "right" : "left"} className="w-auto p-2" sideOffset={8}>
              <span className="text-sm font-medium">{item.label}</span>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    )
  }

  // asLabeledButtonList variant - Mobile: Horizontal scrolling buttons with labels
  if (variant === 'asLabeledButtonList' && isMobile) {
    return (
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-center gap-1 px-2 min-w-max">
          {items.map((item) => (            
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "flex h-16 min-w-16 flex-col gap-1 hover:bg-accent px-2 flex-shrink-0",
                isItemActive(item, currentRoute) && "bg-accent text-accent-foreground"
              )}
              onClick={() => {
                if (item.onClick) item.onClick();
                setHoveredItem(null); // Reset hover state after click
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isItemActive(item, currentRoute) && "text-primary")} />
                {item.badge && (
                  <Badge 
                    className="absolute -top-3 -right-5 h-5 w-5 p-0 flex items-center justify-center" 
                    variant="default"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-center leading-tight whitespace-nowrap">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  // asLabeledButtonList variant - Desktop: Full sidebar with icons and labels
  if (variant === 'asLabeledButtonList' && !isMobile) {
    return (
      <div className="flex flex-col gap-2">
        {items.map((item) => (          
          <Button 
            key={item.id} 
            variant="ghost" 
            className={cn(
              "justify-start gap-3 h-12 px-3 flex-shrink-0",
              isItemActive(item, currentRoute) && "bg-accent text-accent-foreground"
            )}
            onClick={() => {
              if (item.onClick) item.onClick();
              setHoveredItem(null); // Reset hover state after click
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <item.icon className={cn("h-5 w-5", isItemActive(item, currentRoute) && "text-primary")} />
            <span>{item.label}</span>
            {item.badge && (
              <Badge className="ml-auto" variant="default">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    )
  }

  return null
}
