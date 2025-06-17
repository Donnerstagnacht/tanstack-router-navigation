import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/navigation/toggles/theme-toggle"
import { Search } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

type ScreenType = "mobile" | "desktop" | "automatic"

type PriorityType = "primary" | "secondary" | "combined";

interface NavigationDemoProps {
  onScreenTypeChange?: (screenType: "mobile" | "desktop" | "automatic") => void;
  onPriorityChange?: (priority: PriorityType) => void;
}

export default function NavigationDemo({ onScreenTypeChange, onPriorityChange }: NavigationDemoProps) {
  const { t } = useTranslation()
  const isMobileDevice = useIsMobile()
  const [screenType, setScreenType] = useState<ScreenType>("automatic")
  const [actualScreen, setActualScreen] = useState<"mobile" | "desktop">("desktop")
  const [priority, setPriority] = useState<PriorityType>("combined")

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
          <div>            <CardTitle>{t('navigationDemo.title')}</CardTitle>
            <CardDescription>
              {t('navigationDemo.description')}
            </CardDescription>
          </div>
          <ThemeToggle />
        </CardHeader>
        <CardContent className="space-y-6">          <div>            <h3 className="text-lg font-medium mb-3">{t('navigationDemo.screenType.title')}</h3>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={screenType === "mobile" ? "default" : "outline"} 
                onClick={() => handleScreenTypeChange("mobile")}
              >
                {t('navigationDemo.screenType.mobile')}
              </Button>
              <Button 
                variant={screenType === "desktop" ? "default" : "outline"}
                onClick={() => handleScreenTypeChange("desktop")}
              >
                {t('navigationDemo.screenType.desktop')}
              </Button>
              <Button 
                variant={screenType === "automatic" ? "default" : "outline"}
                onClick={() => handleScreenTypeChange("automatic")}
              >
                {t('navigationDemo.screenType.automatic')}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center">
              <Badge variant="outline" className="mr-2">{screenType}</Badge>
              <span>{t('navigationDemo.screenType.description')}</span>
            </div>
          </div>

          <div className="pt-4 border-t">            <h3 className="text-lg font-medium mb-3">{t('navigationDemo.commandPalette.title')}</h3>
            <div>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm text-muted-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                <span>{t('navigationDemo.commandPalette.placeholder')}</span>
                <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">            <h3 className="text-lg font-medium mb-3">{t('navigationDemo.themeSettings.title')}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t('navigationDemo.themeSettings.description')}
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>          <div>            <h3 className="text-lg font-medium mb-3">{t('navigationDemo.priority.title')}</h3>
            <div className="flex gap-2">
              <Button 
                variant={priority === "primary" ? "default" : "outline"}
                onClick={() => handlePriorityChange("primary")}
              >
                {t('navigationDemo.priority.primary')}
              </Button>
              <Button 
                variant={priority === "secondary" ? "default" : "outline"}
                onClick={() => handlePriorityChange("secondary")}
              >
                {t('navigationDemo.priority.secondary')}
              </Button>
              <Button 
                variant={priority === "combined" ? "default" : "outline"}
                onClick={() => handlePriorityChange("combined")}
              >
                {t('navigationDemo.priority.combined')}
              </Button>
            </div>
          </div>          <div className="pt-4 border-t">            <h3 className="text-lg font-medium mb-3">{t('navigationDemo.currentConfig.title')}</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">{t('navigationDemo.currentConfig.state')}: asButton</Badge>
              <Badge variant="secondary">{t('navigationDemo.currentConfig.priority')}: {priority}</Badge>
              <Badge variant="secondary">{t('navigationDemo.currentConfig.screen')}: {actualScreen}</Badge>
            </div>
          </div>

          <div className="pt-4 border-t">            <h3 className="text-lg font-medium mb-3">{t('navigationDemo.stateSwitcher.title')}</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>{t('navigationDemo.stateSwitcher.asButton.title')}</strong> {t('navigationDemo.stateSwitcher.asButton.description')}
              </p>
              <p>
                <strong>{t('navigationDemo.stateSwitcher.asButtonList.title')}</strong> {t('navigationDemo.stateSwitcher.asButtonList.description')}
              </p>
              <p>
                <strong>{t('navigationDemo.stateSwitcher.asLabeledButtonList.title')}</strong> {t('navigationDemo.stateSwitcher.asLabeledButtonList.description')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{t('navigationDemo.sampleContent.title')} {i + 1}</CardTitle>
              <CardDescription>{t('navigationDemo.sampleContent.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('navigationDemo.sampleContent.content')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
