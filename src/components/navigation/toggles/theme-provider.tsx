'use client'

import * as React from 'react'
import { ThemeProvider as CustomThemeProvider, useTheme as useCustomTheme } from '@/hooks/use-theme'

export type { ThemeProviderProps } from '@/hooks/use-theme'

export function ThemeProvider({ children, ...props }: React.PropsWithChildren<any>) {
  return <CustomThemeProvider {...props}>{children}</CustomThemeProvider>
}

// Re-export the useTheme hook
export const useTheme = useCustomTheme
