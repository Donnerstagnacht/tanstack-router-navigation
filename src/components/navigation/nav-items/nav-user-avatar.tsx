"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { NavigationState } from "../dynamic-navigation"

interface NavUserAvatarProps {
  id?: string
  userName: string
  avatarUrl?: string
  onClick?: () => void
  hoveredItem: string | null
  setHoveredItem: (item: string | null) => void
  variant?: NavigationState
  isMobile?: boolean
  className?: string
  onUserClick?: () => void
}

export function NavUserAvatar({
  id,
  userName,
  avatarUrl,
  onClick,
  hoveredItem,
  setHoveredItem,
  variant,
  className,
  isMobile,
  onUserClick,
}: NavUserAvatarProps) {
  // Handle backwards compatibility
  const clickHandler = onClick || onUserClick;
  
  // If no id is provided, use a default based on variant
  const popoverId = id || (isMobile ? "user-avatar-mobile" : "user-avatar");
  
  if (variant === "asButton") {
    return (
      <Button
        variant="ghost"
        className={cn("h-24 flex items-center justify-center gap-4 hover:bg-accent w-fit", className)}
        onClick={clickHandler}
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-lg font-medium">{userName}</span>
      </Button>
    );
  }
  
  if(variant === "asButtonList") {
    return (
      <Popover open={hoveredItem === popoverId}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size={isMobile ? "icon" : undefined}
            className={cn(
              isMobile 
                ? "h-12 w-12 hover:bg-accent flex-shrink-0" 
                : "w-full flex justify-center items-center h-12",
              className
            )}
            onClick={clickHandler}
            onMouseEnter={() => setHoveredItem(popoverId)}
            onMouseLeave={() => setHoveredItem(null)}
            {...(isMobile && {
              onTouchStart: () => setHoveredItem(popoverId),
              onTouchEnd: () => setHoveredItem(null)
            })}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          side={isMobile ? "top" : "right"} 
          className="w-auto p-2" 
          sideOffset={8}
        >
          <span className="text-sm font-medium">{userName}</span>
        </PopoverContent>
      </Popover>
    )
  }  
  
  if (variant === "asLabeledButtonList" && isMobile) {
    return (
      <Popover open={hoveredItem === popoverId}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-12 w-12 hover:bg-accent flex-shrink-0", className)}
            onClick={clickHandler}
            onMouseEnter={() => setHoveredItem(popoverId)}
            onMouseLeave={() => setHoveredItem(null)}
            onTouchStart={() => setHoveredItem(popoverId)}
            onTouchEnd={() => setHoveredItem(null)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          className="w-auto p-2" 
          sideOffset={8}
        >
          <span className="text-sm font-medium">{userName}</span>
        </PopoverContent>
      </Popover>
    );
  }
  
  if (variant === "asLabeledButtonList" && !isMobile) {
    return (
      <div className="px-4">
        <Button
          variant="ghost"
          className={cn("w-full justify-start gap-3 h-12 pl-3 mt-2", className)}
          onClick={clickHandler}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>{userName}</span>
        </Button>
      </div>
    );
  }
}

