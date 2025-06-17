'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

interface LanguageToggleProps {
  language: "en" | "de"
  setLanguage: (lang: "en" | "de") => void
  size?: "default" | "small"
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  variant?: "popover" | "dropdown"
}

export function LanguageToggle({ 
  language, 
  setLanguage, 
  size = "default", 
  className,
  side = "top",
  sideOffset = 8,
  variant = "popover"
}: LanguageToggleProps) {
  const [isLanguagePopoverOpen, setIsLanguagePopoverOpen] = React.useState(false)
  const { i18n } = useTranslation()

  // Helper function to render the language display
  const renderLanguageDisplay = (lang: "en" | "de") => {
    return (
      <span className="flex items-center gap-2">
        <span className={cn("text-base", size === "small" && "text-sm")}>{lang === "en" ? "🇺🇸" : "🇩🇪"}</span>
        <span className={cn("text-sm", size === "small" && "text-xs")}>{lang === "en" ? "English" : "Deutsch"}</span>
      </span>
    )
  }
  // Custom language setter with toast notification and i18n integration
  const handleLanguageChange = (lang: "en" | "de") => {
    // Apply change through the provided setter
    setLanguage(lang)
    
    // Also change the i18n language to keep everything in sync
    i18n.changeLanguage(lang)
    
    // Show notification
    toast.success(
      `${lang === "en" ? "Language changed to English" : "Sprache geändert zu Deutsch"}`, 
      {
        description: `${lang === "en" 
          ? "Your language preference has been updated to English." 
          : "Ihre Spracheinstellung wurde zu Deutsch aktualisiert."}`,
        icon: lang === "en" ? "🇺🇸" : "🇩🇪",
      }
    )
  }

  // If dropdown variant is selected, return the dropdown submenu version
  if (variant === "dropdown") {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <p>{renderLanguageDisplay(language)}</p>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
              {renderLanguageDisplay("en")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("de")}>
              {renderLanguageDisplay("de")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>More languages...</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    )
  }

  // Default popover variant
  return (
    <Popover open={isLanguagePopoverOpen} onOpenChange={setIsLanguagePopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", size === "small" && "h-6 w-6", className)}
          title="Change language"
          onMouseEnter={() => setIsLanguagePopoverOpen(true)}
        >
          <span className={cn("text-sm", size === "small" && "text-xs")}>{language === "en" ? "🇺🇸" : "🇩🇪"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-1"
        side={side}
        sideOffset={sideOffset}
        onMouseLeave={() => setIsLanguagePopoverOpen(false)}
      >
        <div className="flex flex-col gap-1">
          <Button
            variant={language === "en" ? "default" : "ghost"}
            size="sm"
            className="justify-start gap-2 h-8"
            onClick={() => {
              handleLanguageChange("en")
              setIsLanguagePopoverOpen(false)
            }}
          >
            <span className="text-base">🇺🇸</span>
            <span className="text-sm">English</span>
          </Button>
          <Button
            variant={language === "de" ? "default" : "ghost"}
            size="sm"
            className="justify-start gap-2 h-8"
            onClick={() => {
              handleLanguageChange("de")
              setIsLanguagePopoverOpen(false)
            }}
          >
            <span className="text-base">🇩🇪</span>
            <span className="text-sm">Deutsch</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
