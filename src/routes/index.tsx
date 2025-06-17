import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{t('welcomeTitle')}</h1>
        <p className="text-lg text-muted-foreground">{t('welcomeSubtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('cards.navigation.title')}</CardTitle>
            <CardDescription>
              {t('cards.navigation.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('cards.navigation.content')}</p>
          </CardContent>
          <CardFooter>
            <Link to="/settings">
              <Button>{t('cards.navigation.button')}</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('cards.features.title')}</CardTitle>
            <CardDescription>
              {t('cards.features.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">              {(t('cards.features.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('cards.techStack.title')}</CardTitle>
            <CardDescription>
              {t('cards.techStack.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>{t('cards.techStack.frontend')}</strong> React, TanStack Router, Lucide Icons</p>
              <p><strong>{t('cards.techStack.styling')}</strong> Tailwind CSS, Shadcn UI</p>
              <p><strong>{t('cards.techStack.tooling')}</strong> Vite, TypeScript</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/settings">
              <Button variant="outline">{t('cards.techStack.button')}</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
