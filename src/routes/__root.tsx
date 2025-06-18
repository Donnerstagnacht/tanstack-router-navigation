import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from '@/components/ui/sonner';
import { DynamicNavigation } from '@/navigation/dynamic-navigation.tsx';
import { NavigationCommandDialog } from '@/navigation/command-dialog.tsx';
import { useEffect, useState } from 'react';
import { useScreenResponsiveDetector, useScreenStore } from '@/global-state/screen.store.tsx';
import { useNavigationKeyboard } from '@/navigation/nav-keyboard/use-navigation-keyboard.tsx';
import { useNavItems } from '@/navigation/nav-items/nav-items-authenticated.tsx';
import { useThemeInitializer } from '@/global-state/theme.store.tsx';
import type { NavigationItem, NavigationState } from '@/navigation/types/navigation.types';

export const Route = createRootRoute({
  component: () => {
    // Initialize theme and screen responsive detection
    useThemeInitializer({ defaultTheme: 'system', storageKey: 'theme' });
    useScreenResponsiveDetector();

    return (
      <>
        <RootContent />
        <Toaster richColors position="top-right" />
        <TanStackRouterDevtools />
      </>
    );
  },
});

function RootContent() {
  // State for navigation configuration
  const [state, setState] = useState<NavigationState>('asButtonList');
  const [open, setOpen] = useState(false);
  const { screen, priority, setPriority, isMobile } = useScreenStore();

  console.log('screen:', screen);
  console.log('isMobile:', isMobile);

  // Track current route to determine which secondary nav items to display
  const router = useRouter();
  const [currentPrimaryRoute, setCurrentPrimaryRoute] = useState<string | null>(null);

  // Import navigation items from the navigation config
  const { primaryNavItems, getSecondaryNavItems } = useNavItems(router, setCurrentPrimaryRoute);

  const secondaryNavItems = getSecondaryNavItems(currentPrimaryRoute);

  // Use custom hooks for initial route and keyboard shortcuts
  useInitialRoute(setCurrentPrimaryRoute);
  useCommandDialogShortcut(setOpen);

  // Use our custom hook for handling navigation shortcuts
  useNavigationKeyboard({
    isActive: true,
    onNavigate: (navId: string) => {
      const navItems = [...primaryNavItems, ...(secondaryNavItems || [])];
      const navItem = navItems.find(navItem => navItem.id === navId);
      if (navItem) {
        setOpen(false);

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
      }
    },
    onThemeToggle: () => {
      setOpen(false);
    },
    onKeyboardShortcutsOpen: () => {
      setOpen(false);
    },
    onClose: () => setOpen(false),
    items: [...primaryNavItems, ...(secondaryNavItems || [])],
  });

  return (
    <div className="bg-background min-h-screen">
      {(priority === 'primary' || priority === 'combined') && (
        <DynamicNavigation
          state={state}
          priority="primary"
          screen={screen}
          onStateChange={newState => {
            setState(newState);
            console.log(`State changed to ${newState}`);
          }}
          userName="John Doe"
          avatarUrl="/placeholder-user.jpg"
          onUserClick={() => console.log('User profile clicked')}
          navigationItems={primaryNavItems}
        />
      )}
      {secondaryNavItems && (priority === 'secondary' || priority === 'combined') && (
        <DynamicNavigation
          state={state}
          priority="secondary"
          screen={screen}
          onStateChange={newState => {
            setState(newState);
            console.log(`State changed to ${newState}`);
          }}
          userName="John Doe"
          avatarUrl="/placeholder-user.jpg"
          onUserClick={() => console.log('User profile clicked')}
          navigationItems={secondaryNavItems}
        />
      )}
      <main
        className={`transition-all duration-300 ${getMarginClass({
          isMobile,
          state,
          priority,
          secondaryNavItems,
        })}`}
      >
        <Outlet />
      </main>

      {/* Command Dialog for global search */}
      <NavigationCommandDialog
        open={open}
        setOpen={setOpen}
        primaryNavItems={primaryNavItems}
        secondaryNavItems={secondaryNavItems}
        priority={priority}
        onThemeToggle={() => console.log('Changing theme')}
        onKeyboardShortcutsOpen={() => console.log('Opening keyboard shortcuts')}
      />
    </div>
  );
}

// Custom hook to set initial route based on window location
function useInitialRoute(
  setCurrentPrimaryRoute: React.Dispatch<React.SetStateAction<string | null>>
) {
  useEffect(() => {
    const path = window.location.pathname;
    const route = path === '/' ? 'home' : path.split('/')[1];
    setCurrentPrimaryRoute(route);
  }, [setCurrentPrimaryRoute]);
}

// Custom hook to handle command dialog keyboard shortcut
function useCommandDialogShortcut(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to toggle command dialog
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
        return;
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);
}

// Function to calculate the margin classes based on navigation state and screen
function getMarginClass({
  isMobile,
  state,
  priority,
  secondaryNavItems,
}: {
  isMobile: boolean;
  state: NavigationState;
  priority: string;
  secondaryNavItems: NavigationItem[] | null;
}) {
  console.log('called getMarginClass with:', {
    isMobile,
    state,
    priority,
    secondaryNavItems,
  });

  // Check if secondary navigation items exist
  const hasSecondaryNav = secondaryNavItems && secondaryNavItems.length > 0;
  // Check if secondary nav should be visible based on priority
  const isSecondaryNavVisible =
    hasSecondaryNav && (priority === 'secondary' || priority === 'combined');
  const isPrimaryNavVisible = priority === 'primary' || priority === 'combined';

  // Mobile navigation
  if (isMobile && (state === 'asButtonList' || state === 'asLabeledButtonList')) {
    if (priority === 'combined' && hasSecondaryNav) {
      return 'mt-16 mb-20'; // Space for both bars
    }
  }

  // Desktop side navigation
  if (!isMobile) {
    if (state === 'asButton') return '';
    if (state === 'asButtonList') {
      if (priority === 'combined' && hasSecondaryNav) {
        return 'ml-16 mr-16'; // Space for both side bars
      }

      // Only add right margin if secondary nav exists and is visible
      const rightMargin = isSecondaryNavVisible ? 'mr-16' : '';
      // Only add left margin if primary nav is visible
      const leftMargin = isPrimaryNavVisible ? 'ml-16' : '';

      return `${leftMargin} ${rightMargin}`.trim();
    }
    if (state === 'asLabeledButtonList') {
      if (priority === 'combined' && hasSecondaryNav) {
        return 'ml-64 mr-64'; // Space for both labeled side bars
      }

      // Only add right margin if secondary nav exists and is visible
      const rightMargin = isSecondaryNavVisible ? 'mr-64' : '';
      // Only add left margin if primary nav is visible
      const leftMargin = isPrimaryNavVisible ? 'ml-64' : '';

      return `${leftMargin} ${rightMargin}`.trim();
    }
  }

  return '';
}
