import { useState } from 'react';
import { navItemsAuthenticated } from '@/navigation/nav-items/nav-items-authenticated';
import { useInitialRoute } from '@/navigation/state/useInitialRoute';
import { useRouter } from '@tanstack/react-router';

/**
 * Custom hook that manages navigation items for primary and secondary navigation
 * @returns Object containing primary and secondary navigation items
 */
export function useNavigation() {
  // Get router instance directly within the hook
  const router = useRouter();
  const [currentPrimaryRoute, setCurrentPrimaryRoute] = useState<string | null>(null);

  // Import navigation items from the navigation config
  const { primaryNavItems, getSecondaryNavItems } = navItemsAuthenticated(
    router,
    setCurrentPrimaryRoute
  );

  const secondaryNavItems = getSecondaryNavItems(currentPrimaryRoute);

  // Use custom hook for initial route
  useInitialRoute(setCurrentPrimaryRoute);

  return {
    primaryNavItems,
    secondaryNavItems,
    currentPrimaryRoute,
  };
}
