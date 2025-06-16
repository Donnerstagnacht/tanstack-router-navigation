import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Willkommen bei Polity</h1>
        <p className="text-lg text-muted-foreground">Eine TanStack Router Demo mit dynamischer Navigation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Navigation Demo</CardTitle>
            <CardDescription>
              Erleben Sie unsere dynamische Navigation mit verschiedenen Layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Testen Sie verschiedene Navigationstypen, Prioritäten und Bildschirmkonfigurationen.</p>
          </CardContent>
          <CardFooter>
            <Link to="/settings">
              <Button>Navigation Demo anzeigen</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Hauptfunktionen dieser Anwendung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dynamische, konfigurierbare Navigation</li>
              <li>Reaktive Layouts für mobile und Desktop-Geräte</li>
              <li>Tastaturnavigation mit Shortcuts</li>
              <li>Kommandopalette (Drücken Sie ⌘K)</li>
              <li>Themenwechsel (hell/dunkel)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tech-Stack</CardTitle>
            <CardDescription>
              Verwendete Technologien
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Frontend:</strong> React, TanStack Router, Lucide Icons</p>
              <p><strong>Styling:</strong> Tailwind CSS, Shadcn UI</p>
              <p><strong>Tooling:</strong> Vite, TypeScript</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/settings">
              <Button variant="outline">Demo starten</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button>Button</Button>
      </div>

    </div>
  )
}
