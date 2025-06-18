import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useEffect } from 'react';
import type { PriorityType, ScreenType } from '@/navigation/types/navigation.types.tsx';

// Define the mobile breakpoint
const MOBILE_BREAKPOINT = 768;

// Define the store state interface
interface ScreenState {
  screen: ScreenType;
  priority: PriorityType;
  isMobile: boolean;
  effectiveScreen: ScreenType;
}

// Define the store actions interface
interface ScreenActions {
  setScreen: (screenType: ScreenType) => void;
  setPriority: (priorityType: PriorityType) => void;
  setIsMobile: (isMobile: boolean) => void;
}

// Create the screen store with zustand and immer
export const useScreenStore = create<ScreenState & ScreenActions>()(
  immer((set, get) => ({
    // Initial state
    screen: 'automatic',
    priority: 'combined',
    isMobile: false,

    // Computed property that calculates the effective screen type
    get effectiveScreen() {
      const { screen, isMobile } = get();
      return screen === 'automatic' ? (isMobile ? 'mobile' : 'desktop') : screen;
    },

    // Actions
    setScreen: screenType => {
      set(state => {
        state.screen = screenType;
      });
    },

    setPriority: priorityType => {
      set(state => {
        state.priority = priorityType;
      });
    },

    setIsMobile: mobile => {
      set(state => {
        state.isMobile = mobile;
      });
    },
  }))
);

/**
 * Hook that initializes responsive screen detection
 * This should be used in your app's root component
 */
export function useScreenResponsiveDetector(): void {
  const setIsMobile = useScreenStore(state => state.setIsMobile);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
    };

    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Subscribe to changes
    mql.addEventListener('change', onChange);

    // Cleanup on unmount
    return () => mql.removeEventListener('change', onChange);
  }, [setIsMobile]);
}

/**
 * Hook that provides a convenient way to access all screen values
 * and computed properties in a single object
 */
export function useScreen() {
  const screen = useScreenStore(state => state.screen);
  const setScreen = useScreenStore(state => state.setScreen);
  const priority = useScreenStore(state => state.priority);
  const setPriority = useScreenStore(state => state.setPriority);
  const isMobile = useScreenStore(state => state.isMobile);
  const effectiveScreen = useScreenStore(state => state.effectiveScreen);

  return {
    screen,
    setScreen,
    priority,
    setPriority,
    isMobile,
    effectiveScreen,
  };
}
