import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Keyboard, Moon } from 'lucide-react';
import { getIconComponent } from '@/navigation/nav-items/icon-map.tsx';
import { getShortcutForItem } from '@/navigation/nav-keyboard/keyboard-navigation.ts';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useNavigationKeyboard } from '@/navigation/nav-keyboard/use-navigation-keyboard.tsx';
import { useScreenStore } from '@/global-state/screen.store.tsx';
import type { NavigationItem } from '@/navigation/types/navigation.types.tsx';

// Custom hook to handle command dialog keyboard shortcut
export function useCommandDialogShortcut(setOpen: (open: boolean) => void, isOpen: boolean) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to toggle command dialog
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!isOpen); // Toggle based on current state
        return;
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen, isOpen]);
}

export function NavigationCommandDialog({
  primaryNavItems,
  secondaryNavItems,
  priority,
}: {
  primaryNavItems: NavigationItem[];
  secondaryNavItems: NavigationItem[] | null;
  priority: 'primary' | 'secondary' | 'combined';
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  // Aktiviere den Keyboard-Shortcut direkt in der Komponente
  useCommandDialogShortcut(setOpen, open);

  // Definiere die Callback-Funktionen für Navigation und Dialoge
  const onThemeToggle = () => {
    // Implement theme toggle logic here
    setOpen(false);
  };

  const onKeyboardShortcutsOpen = () => {
    // Implement logic to open keyboard shortcuts dialog
    setOpen(false);
  };

  // Verwende den Navigation-Keyboard-Hook direkt in der Komponente
  // Import setPriority für die Navigation-Priorisierung
  const { setPriority } = useScreenStore();

  useNavigationKeyboard({
    isActive: true,
    onNavigate: (navId: string) => {
      const navItems = [...primaryNavItems, ...(secondaryNavItems || [])];
      const navItem = navItems.find(navItem => navItem.id === navId);
      if (navItem) {
        // Navigate to the appropriate route using TanStack Router
        if (navItem.onClick) {
          navItem.onClick();
        } else {
          const route = navId === 'home' ? '/' : `/${navId}`;
          router.navigate({ to: route });
        }

        // Toggle priority based on navigation item if it exists in both
        const inPrimary = primaryNavItems.some(primaryNavItem => primaryNavItem.id === navItem.id);
        const inSecondary = secondaryNavItems
          ? secondaryNavItems.some(secondaryNavItem => secondaryNavItem.id === navItem.id)
          : false;

        if (inPrimary && !inSecondary) {
          setPriority('primary');
        } else if (inSecondary && !inPrimary) {
          setPriority('secondary');
        }

        setOpen(false);
      }
    },
    onThemeToggle,
    onKeyboardShortcutsOpen,
    onClose: () => setOpen(false),
    items: [...primaryNavItems, ...(secondaryNavItems || [])],
  });

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t('commandDialog.placeholder')} />
      <CommandList>
        <CommandEmpty>{t('commandDialog.noResults')}</CommandEmpty>
        <CommandGroup heading={t('commandDialog.groups.primaryNavigation')}>
          {primaryNavItems.map(item => {
            const IconComponent = getIconComponent(item.icon);
            return (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  // Navigate to the appropriate route using TanStack Router
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    const route = item.id === 'home' ? '/' : `/${item.id}`;
                    router.navigate({ to: route });
                  }
                  setOpen(false);
                }}
              >
                <div className="flex items-center">
                  <IconComponent className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-2" variant="secondary">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <CommandShortcut>{getShortcutForItem(item.id).display}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>

        {priority === 'combined' && secondaryNavItems && (
          <>
            <CommandSeparator />
            <CommandGroup heading={t('commandDialog.groups.secondaryNavigation')}>
              {secondaryNavItems.map(item => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      // Navigate to the appropriate route using TanStack Router
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        router.navigate({ to: item.href });
                      }
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <IconComponent className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-2" variant="secondary">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <CommandShortcut>{getShortcutForItem(item.id).display}</CommandShortcut>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading={t('commandDialog.groups.settings')}>
          <CommandItem
            onSelect={() => {
              if (onThemeToggle) onThemeToggle();
              setOpen(false);
            }}
          >
            <Moon className="mr-2 h-4 w-4" />
            {t('commandDialog.items.changeTheme')}
            <CommandShortcut>{getShortcutForItem('theme').display}</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              if (onKeyboardShortcutsOpen) onKeyboardShortcutsOpen();
              setOpen(false);
            }}
          >
            <Keyboard className="mr-2 h-4 w-4" />
            {t('commandDialog.items.keyboardShortcuts')}
            <CommandShortcut>{getShortcutForItem('keyboard').display}</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
