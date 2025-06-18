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
import type { NavigationItem } from '@/navigation/types/navigation.types.tsx';

export function NavigationCommandDialog({
  open,
  setOpen,
  primaryNavItems,
  secondaryNavItems,
  priority,
  onThemeToggle,
  onKeyboardShortcutsOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  primaryNavItems: NavigationItem[];
  secondaryNavItems: NavigationItem[] | null;
  priority: 'primary' | 'secondary' | 'combined';
  onThemeToggle?: () => void;
  onKeyboardShortcutsOpen?: () => void;
}) {
  const { t } = useTranslation();
  const router = useRouter();

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
