'use client';

import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/navigation/toggles/theme-toggle';
import { StateToggle } from '@/components/navigation/toggles/state-toggle';
import { LanguageToggle } from '@/components/navigation/toggles/language-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Language, NavigationPriority, NavigationState } from '../dynamic-navigation';

interface StateSwitcherProps {
  state: NavigationState;
  onStateChange?: (newState: NavigationState) => void;
  language?: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
  isMobile?: boolean;
  variant?: NavigationState | 'asLabeledButtonList';
  priority?: NavigationPriority;
}

export const StateSwitcher: React.FC<StateSwitcherProps> = ({
  state,
  onStateChange,
  isMobile = false,
  variant,
  priority = 'primary',
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [hoverTimeout, setHoverTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const isPrimary = priority === 'primary';
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  if (!onStateChange) return null;

  // Horizontal layout for asLabeledButtonList
  if (variant === 'asLabeledButtonList' && !isMobile) {
    return (
      <div className="flex items-center gap-3">
        <StateToggle currentState={state} onStateChange={onStateChange} size="small" />
        <div className="bg-border h-8 w-px"></div>
        <LanguageToggle size="small" />
        <div className="bg-border h-8 w-px"></div>
        <ThemeToggle size="small" />
      </div>
    );
  }

  // Mobile expandable variant - positioned based on priority
  if ((variant === 'asButtonList' && isMobile) || (variant === 'asLabeledButtonList' && isMobile)) {
    return (
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent h-12 w-12"
            onMouseEnter={() => {
              if (hoverTimeout) {
                clearTimeout(hoverTimeout);
              }
              const timeout = setTimeout(() => {
                setIsDropdownOpen(true);
              }, 200);
              setHoverTimeout(timeout);
            }}
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={isPrimary ? 'top' : 'top'}
          align="end"
          className="p-1"
          style={{ width: 'max-content', minWidth: 'fit-content' }}
          sideOffset={5}
          onMouseEnter={() => {
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            setIsDropdownOpen(true);
          }}
          onMouseLeave={() => {
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            const timeout = setTimeout(() => {
              setIsDropdownOpen(false);
            }, 300);
            setHoverTimeout(timeout);
          }}
        >
          <div className="px-1 py-1">
            <ThemeToggle size="small" />
          </div>
          <DropdownMenuSeparator />
          <LanguageToggle size="small" variant="dropdown" />
          <DropdownMenuSeparator />
          <div className="p-1">
            <StateToggle
              currentState={state}
              onStateChange={newState => {
                onStateChange(newState);
                setIsDropdownOpen(false);
              }}
              size="small"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Expandable variant for desktop asButtonList
  if (variant === 'asButtonList' && !isMobile) {
    return (
      <DropdownMenu open={isExpanded} onOpenChange={setIsExpanded}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onMouseEnter={() => {
              // Clear any existing timeout
              if (hoverTimeout) {
                clearTimeout(hoverTimeout);
              }
              // Set a new timeout to show the dropdown after a short delay
              const timeout = setTimeout(() => {
                setIsExpanded(true);
              }, 200);
              setHoverTimeout(timeout);
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={isPrimary ? 'right' : 'left'}
          align="start"
          className="p-1"
          style={{ width: 'max-content', minWidth: 'fit-content' }}
          sideOffset={5}
          onMouseEnter={() => {
            // Clear any existing timeout
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            setIsExpanded(true);
          }}
          onMouseLeave={() => {
            // Clear any existing timeout
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            const timeout = setTimeout(() => {
              setIsExpanded(false);
            }, 300);
            setHoverTimeout(timeout);
          }}
        >
          <div className="px-1 py-1">
            <ThemeToggle size="small" />
          </div>
          <DropdownMenuSeparator />
          <>
            <LanguageToggle size="small" variant="dropdown" />
            <DropdownMenuSeparator />
          </>
          <div className="p-1">
            <StateToggle
              currentState={state}
              onStateChange={newState => {
                onStateChange(newState);
                setIsExpanded(false);
              }}
              size="small"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Overlay variant for asButton fullscreen
  if (variant === 'asButton') {
    return (
      <div className="bg-background/95 absolute bottom-8 left-1/2 flex -translate-x-1/2 transform gap-2 rounded-full border p-2 shadow-lg backdrop-blur-sm">
        <StateToggle currentState={state} onStateChange={onStateChange} />
        <>
          <div className="bg-border mx-1 w-px"></div>
          <LanguageToggle />
        </>
        <div className="bg-border mx-1 w-px"></div>
        <ThemeToggle size="default" />
      </div>
    );
  }
};
