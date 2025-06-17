'use client';

import * as React from 'react';
import {
  ThemeProvider as CustomThemeProvider,
  useTheme as useCustomTheme,
} from '@/hooks/use-theme';
import type { ThemeProviderProps } from '@/hooks/use-theme';

// Use 'export type' for re-exporting types when verbatimModuleSyntax is enabled
export type { ThemeProviderProps } from '@/hooks/use-theme';

// Properly type the props using the imported ThemeProviderProps type
export function ThemeProvider({ children, ...props }: React.PropsWithChildren<ThemeProviderProps>) {
  return <CustomThemeProvider {...props}>{children}</CustomThemeProvider>;
}

export const useTheme = useCustomTheme;
