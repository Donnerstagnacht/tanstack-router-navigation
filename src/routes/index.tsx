import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('home.welcomeTitle')}</h1>
        <p className="text-muted-foreground text-lg">{t('home.welcomeSubtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('home.cards.navigation.title')}</CardTitle>
            <CardDescription>{t('home.cards.navigation.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('home.cards.navigation.content')}</p>
          </CardContent>
          <CardFooter>
            <Link to="/settings">
              <Button>{t('home.cards.navigation.button')}</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('home.cards.features.title')}</CardTitle>
            <CardDescription>{t('home.cards.features.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {' '}
              {(t('home.cards.features.items', { returnObjects: true }) as string[]).map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('home.cards.techStack.title')}</CardTitle>
            <CardDescription>{t('home.cards.techStack.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>{t('home.cards.techStack.frontend')}</strong> React, TanStack Router, Lucide
                Icons
              </p>
              <p>
                <strong>{t('home.cards.techStack.styling')}</strong> Tailwind CSS, Shadcn UI
              </p>
              <p>
                <strong>{t('home.cards.techStack.tooling')}</strong> Vite, TypeScript
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/settings">
              <Button variant="outline">{t('home.cards.techStack.button')}</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
