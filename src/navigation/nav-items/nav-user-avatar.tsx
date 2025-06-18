import { Button } from '@/components/ui/button.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/i18n/i18n.types.ts';
import type { NavigationState } from '@/navigation/types/navigation.types.tsx';

export function NavUserAvatar({
  id,
  hoveredItem,
  setHoveredItem,
  variant,
  className,
  isMobile,
}: {
  id?: string;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  variant?: NavigationState;
  isMobile?: boolean;
  className?: string;
}) {
  // Handle backwards compatibility
  const clickHandler = () => {
    console.log('User avatar clicked');
  };

  const avatarUrl = '/placeholder-user.jpg';
  const userName = 'John Doe';

  // If no id is provided, use a default based on variant
  const popoverId = id || (isMobile ? 'user-avatar-mobile' : 'user-avatar');

  if (variant === 'asButton') {
    return (
      <Button
        variant="ghost"
        className={cn(
          'hover:bg-accent flex h-24 w-fit items-center justify-center gap-4',
          className
        )}
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

  if (variant === 'asButtonList') {
    return (
      <Popover open={hoveredItem === popoverId}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size={isMobile ? 'icon' : undefined}
            className={cn(
              isMobile
                ? 'hover:bg-accent h-12 w-12 flex-shrink-0'
                : 'flex h-12 w-full items-center justify-center',
              className
            )}
            onClick={clickHandler}
            onMouseEnter={() => setHoveredItem(popoverId)}
            onMouseLeave={() => setHoveredItem(null)}
            {...(isMobile && {
              onTouchStart: () => setHoveredItem(popoverId),
              onTouchEnd: () => setHoveredItem(null),
            })}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent side={isMobile ? 'top' : 'right'} className="w-auto p-2" sideOffset={8}>
          <span className="text-sm font-medium">{userName}</span>
        </PopoverContent>
      </Popover>
    );
  }

  if (variant === 'asLabeledButtonList' && isMobile) {
    return (
      <Popover open={hoveredItem === popoverId}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('hover:bg-accent h-12 w-12 flex-shrink-0', className)}
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
        <PopoverContent side="top" className="w-auto p-2" sideOffset={8}>
          <span className="text-sm font-medium">{userName}</span>
        </PopoverContent>
      </Popover>
    );
  }

  if (variant === 'asLabeledButtonList' && !isMobile) {
    return (
      <div className="px-4">
        <Button
          variant="ghost"
          className={cn('mt-2 h-12 w-full justify-start gap-3 pl-3', className)}
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
