import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from '@/components/ui/sonner';
import { DynamicNavigation } from '@/components/navigation/dynamic-navigation';
import { NavigationCommandDialog } from '@/components/navigation/command-dialog';
import { useState, useEffect } from 'react';
import { ScreenProvider, useScreenContext } from '@/contexts/screen-context';
import { useNavigationKeyboard } from '@/hooks/use-navigation-keyboard';
import { useNavItems } from '@/lib/navigation/nav-config';
import { useThemeInitializer } from '@/hooks/theme.store';

export const Route = createRootRoute({
  component: () => {
    // Initialisiere das Theme direkt in der Root-Komponente
    useThemeInitializer({ defaultTheme: 'system', storageKey: 'theme' });

    return (
      <ScreenProvider>
        <RootContent />
        <Toaster richColors position="top-right" />
        <TanStackRouterDevtools />
      </ScreenProvider>
    );
  },
});

function RootContent() {
  // State for navigation configuration
  const [state, setState] = useState<'asButton' | 'asButtonList' | 'asLabeledButtonList'>(
    'asButtonList'
  );
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // Get screen and priority from context
  const { screen, priority, setPriority } = useScreenContext();
  // Track current route to determine which secondary nav items to display
  const [currentPrimaryRoute, setCurrentPrimaryRoute] = useState<string | null>(null);

  // Import navigation items from the navigation config
  const { primaryNavItems, getSecondaryNavItems } = useNavItems(router, setCurrentPrimaryRoute);

  const secondaryNavItems = getSecondaryNavItems(currentPrimaryRoute);

  // Set initial route based on current path
  useEffect(() => {
    const path = window.location.pathname;
    const route = path === '/' ? 'home' : path.split('/')[1];
    setCurrentPrimaryRoute(route);
  }, []);

  // Add command dialog open effect with keyboard shortcut
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
  }, []);

  // Use our custom hook for handling navigation shortcuts
  useNavigationKeyboard({
    isActive: true,
    onNavigate: (itemId: string) => {
      const allItems = [...primaryNavItems, ...(secondaryNavItems || [])];
      const item = allItems.find(item => item.id === itemId);
      if (item) {
        console.log(`Navigating to ${item.label}`);
        setOpen(false);

        // Navigate to the appropriate route using TanStack Router
        if (item.onClick) {
          item.onClick();
        } else {
          const route = itemId === 'home' ? '/' : `/${itemId}`;
          router.navigate({ to: route });
        }

        // Toggle priority based on navigation item if it exists in both
        const inPrimary = primaryNavItems.some(i => i.id === item.id);
        const inSecondary = secondaryNavItems
          ? secondaryNavItems.some(i => i.id === item.id)
          : false;
        if (inPrimary && !inSecondary) {
          setPriority('primary');
        } else if (inSecondary && !inPrimary) {
          setPriority('secondary');
        }
      }
    },
    onThemeToggle: () => {
      console.log('Changing theme');
      setOpen(false);
    },
    onKeyboardShortcutsOpen: () => {
      console.log('Opening keyboard shortcuts');
      setOpen(false);
    },
    onClose: () => setOpen(false),
    items: [...primaryNavItems, ...(secondaryNavItems || [])],
  });

  const getMarginClass = () => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const isEffectivelyMobile = screen === 'mobile' || (screen === 'automatic' && isMobileDevice);
    const isEffectivelyDesktop =
      screen === 'desktop' || (screen === 'automatic' && !isMobileDevice);

    // Check if secondary navigation items exist
    const hasSecondaryNav = secondaryNavItems && secondaryNavItems.length > 0;
    // Check if secondary nav should be visible based on priority
    const isSecondaryNavVisible =
      hasSecondaryNav && (priority === 'secondary' || priority === 'combined');
    const isPrimaryNavVisible = priority === 'primary' || priority === 'combined';

    // Mobile navigation
    if (isEffectivelyMobile && (state === 'asButtonList' || state === 'asLabeledButtonList')) {
      if (priority === 'combined' && hasSecondaryNav) {
        return 'mt-20 mb-20'; // Space for both bars
      }

      // Only add top margin if secondary nav exists and is visible
      const topMargin = isSecondaryNavVisible ? 'mt-20' : '';
      // Only add bottom margin if primary nav is visible
      const bottomMargin = isPrimaryNavVisible ? 'mb-20' : '';

      return `${topMargin} ${bottomMargin}`.trim();
    }

    // Desktop side navigation
    if (isEffectivelyDesktop) {
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
  };

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
      <main className={`transition-all duration-300 ${getMarginClass()}`}>
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
