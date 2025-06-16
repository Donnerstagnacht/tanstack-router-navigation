"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/navigation/toggles/theme-toggle"
import { Search } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"

type ScreenType = "mobile" | "desktop" | "automatic"

type PriorityType = "primary" | "secondary" | "combined";

interface NavigationDemoProps {
  onScreenTypeChange?: (screenType: "mobile" | "desktop" | "automatic") => void;
  onPriorityChange?: (priority: PriorityType) => void;
}

export default function NavigationDemo({ onScreenTypeChange, onPriorityChange }: NavigationDemoProps) {
  const isMobileDevice = useIsMobile()
  const [screenType, setScreenType] = useState<ScreenType>("automatic")
  const [actualScreen, setActualScreen] = useState<"mobile" | "desktop">("desktop")
  const [priority, setPriority] = useState<PriorityType>("primary")

  // Handle screen type changes
  const handleScreenTypeChange = (type: ScreenType) => {
    setScreenType(type);
    if (onScreenTypeChange) {
      onScreenTypeChange(type);
    }
  }
  
  // Handle priority changes
  const handlePriorityChange = (type: PriorityType) => {
    setPriority(type);
    if (onPriorityChange) {
      onPriorityChange(type);
    }
  }

  // Update actual screen type based on screenType selection and device
  useEffect(() => {
    if (screenType === "automatic") {
      setActualScreen(isMobileDevice ? "mobile" : "desktop")
    } else {
      setActualScreen(screenType)
    }
  }, [screenType, isMobileDevice])
  return (
    <div className="container mx-auto p-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Dynamic Navigation Demo</CardTitle>
            <CardDescription>
              Test different navigation configurations
            </CardDescription>
          </div>
          <ThemeToggle />
        </CardHeader>
        <CardContent className="space-y-6">          <div>
            <h3 className="text-lg font-medium mb-3">Screen Type</h3>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={screenType === "mobile" ? "default" : "outline"} 
                onClick={() => handleScreenTypeChange("mobile")}
              >
                Mobile
              </Button>
              <Button 
                variant={screenType === "desktop" ? "default" : "outline"}
                onClick={() => handleScreenTypeChange("desktop")}
              >
                Desktop
              </Button>
              <Button 
                variant={screenType === "automatic" ? "default" : "outline"}
                onClick={() => handleScreenTypeChange("automatic")}
              >
                Automatic
              </Button>
            </div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center">
              <Badge variant="outline" className="mr-2">{screenType}</Badge>
              <span>Switches between mobile and desktop based on screen width</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Command Palette</h3>
            <div>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm text-muted-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Search commands...</span>
                <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Theme Settings</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  The theme automatically syncs with your system preference. You can also manually set it.
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>          <div>
            <h3 className="text-lg font-medium mb-3">Priority</h3>
            <div className="flex gap-2">
              <Button 
                variant={priority === "primary" ? "default" : "outline"}
                onClick={() => handlePriorityChange("primary")}
              >
                Primary
              </Button>
              <Button 
                variant={priority === "secondary" ? "default" : "outline"}
                onClick={() => handlePriorityChange("secondary")}
              >
                Secondary
              </Button>
              <Button 
                variant={priority === "combined" ? "default" : "outline"}
                onClick={() => handlePriorityChange("combined")}
              >
                Combined
              </Button>
            </div>
          </div>          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Current Configuration</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">State: asButton</Badge>
              <Badge variant="secondary">Priority: {priority}</Badge>
              <Badge variant="secondary">Screen: {actualScreen}</Badge>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">State Switcher Behavior</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>asButton:</strong> State icons appear horizontally in the fullscreen overlay
              </p>
              <p>
                <strong>asButtonList:</strong> "More" icon that expands to show state icons on hover/tap
              </p>
              <p>
                <strong>asLabeledButtonList:</strong> State icons displayed horizontally in footer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Sample Content {i + 1}</CardTitle>
              <CardDescription>This content demonstrates how the navigation affects page layout</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
