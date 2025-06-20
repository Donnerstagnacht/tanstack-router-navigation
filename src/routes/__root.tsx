import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from '@/components/ui/sonner';
import { DynamicNavigation } from '@/navigation/dynamic-navigation.tsx';
import { NavigationCommandDialog } from '@/navigation/command-dialog.tsx';
import { useScreenResponsiveDetector, useScreenStore } from '@/global-state/screen.store.tsx';
import { useNavigationStore } from '@/navigation/state/navigation.store';
import { useThemeInitializer } from '@/global-state/theme.store.tsx';
import type {
  NavigationItem,
  NavigationType,
  NavigationView,
} from '@/navigation/types/navigation.types';
import { useNavigation } from '@/navigation/state/useNavigation';
import { navItemsUnauthenticated } from '@/navigation/nav-items/nav-items-unauthenticated';
import { useAuthStore, useAuthInitializer } from '@/global-state/auth.store';

export const Route = createRootRoute({
  component: () => {
    // Initialize theme, screen responsive detection, and auth state
    useThemeInitializer({ defaultTheme: 'system', storageKey: 'theme' });
    useScreenResponsiveDetector();

    // Initialize authentication
    useAuthInitializer({
      onInitialized: isAuthenticated => {
        console.log('Auth initialized:', isAuthenticated);
        // You could trigger additional actions here when auth state is initialized
      },
      // Uncomment to enable auto-login for development
      autoLogin: true,
      storageKey: 'auth-storage',
    });

    return (
      <>
        <Layout />
        <Toaster richColors position="top-right" />
        <TanStackRouterDevtools />
      </>
    );
  },
});

function Layout() {
  const { screenType, isMobileScreen } = useScreenStore();
  const { navigationType, navigationView } = useNavigationStore();
  const { primaryNavItems, secondaryNavItems } = useNavigation();
  const { isAuthenticated } = useAuthStore();

  // Determine navigation items based on authentication status
  const navigationItems = isAuthenticated ? primaryNavItems : navItemsUnauthenticated;

  const isMobile = screenType === 'mobile' || (screenType === 'automatic' && isMobileScreen);

  return (
    <div className="bg-background min-h-screen">
      {['primary', 'combined'].includes(navigationType) && (
        <DynamicNavigation
          navigationType="primary"
          navigationView={navigationView}
          navigationItems={navigationItems}
          screenType={screenType}
        />
      )}
      {isAuthenticated &&
        secondaryNavItems &&
        ['secondary', 'combined'].includes(navigationType) && (
          <DynamicNavigation
            navigationType="secondary"
            navigationView={navigationView}
            navigationItems={secondaryNavItems}
            screenType={screenType}
          />
        )}
      <main
        className={`transition-all duration-300 ${getMarginClasses({
          isMobile,
          navigationView: navigationView,
          navigationType: navigationType,
          secondaryNavItems,
        })}`}
      >
        <Outlet />
      </main>

      {/* Command Dialog for global search */}
      <NavigationCommandDialog
        primaryNavItems={navigationItems}
        secondaryNavItems={secondaryNavItems}
      />
    </div>
  );
}

function getMarginClasses({
  isMobile,
  navigationView,
  navigationType,
  secondaryNavItems,
}: {
  isMobile: boolean;
  navigationView: NavigationView;
  navigationType: NavigationType;
  secondaryNavItems: NavigationItem[] | null;
}) {
  // Check if secondary nav should be visible based on priority
  const isSecondaryNavVisible =
    secondaryNavItems &&
    secondaryNavItems.length > 0 &&
    ['secondary', 'combined'].includes(navigationType);

  const marginLeft = getMarginLeftForPrimaryDesktop({
    isMobile,
    navigationView: navigationView,
  });
  const marginRight = getMarginRightForSecondaryDesktop({
    isMobile,
    state: navigationView,
    isSecondaryNavVisible,
  });
  const marginTop = getMarginTopForSecondaryMobile({
    isMobile,
    navigationView: navigationView,
    isSecondaryNavVisible,
  });
  const marginBottom = getMarginBottomForPrimaryMobile({
    isMobile,
    navigationView: navigationView,
  });

  return [marginLeft, marginRight, marginTop, marginBottom].filter(Boolean).join(' ');
}

function getMarginLeftForPrimaryDesktop({
  isMobile,
  navigationView,
}: {
  isMobile: boolean;
  navigationView: NavigationView;
}): string {
  if (isMobile) return '';

  if (navigationView === 'asButton') return '';
  if (navigationView === 'asButtonList') return 'ml-16';
  if (navigationView === 'asLabeledButtonList') return 'ml-64';

  return '';
}

function getMarginRightForSecondaryDesktop({
  isMobile,
  state,
  isSecondaryNavVisible,
}: {
  isMobile: boolean;
  state: NavigationView;
  isSecondaryNavVisible: boolean | null;
}): string {
  if (isMobile) return '';

  if (state === 'asButton') return '';
  if (state === 'asButtonList' && isSecondaryNavVisible) return 'mr-16';
  if (state === 'asLabeledButtonList' && isSecondaryNavVisible) return 'mr-64';

  return '';
}

function getMarginTopForSecondaryMobile({
  isMobile,
  navigationView,
  isSecondaryNavVisible,
}: {
  isMobile: boolean;
  navigationView: NavigationView;
  isSecondaryNavVisible: boolean | null;
}): string {
  if (!isMobile || !isSecondaryNavVisible) return '';

  if (navigationView === 'asButtonList') {
    return 'mt-16';
  }

  if (navigationView === 'asLabeledButtonList') {
    return 'mt-20';
  }

  return '';
}

function getMarginBottomForPrimaryMobile({
  isMobile,
  navigationView,
}: {
  isMobile: boolean;
  navigationView: NavigationView;
}): string {
  if (!isMobile) return '';

  if (navigationView === 'asButtonList') {
    return 'mb-16';
  }

  if (navigationView === 'asLabeledButtonList') {
    return 'mb-20';
  }

  return '';
}
