import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Erstellen der Übersetzungsressourcen
const resources = {
  en: {
    translation: {
      welcomeTitle: "Welcome to Polity",
      welcomeSubtitle: "A TanStack Router Demo with Dynamic Navigation",
      cards: {
        navigation: {
          title: "Navigation Demo",
          description: "Experience our dynamic navigation with different layouts",
          content: "Test different navigation types, priorities, and screen configurations.",
          button: "Show Navigation Demo"
        },
        features: {
          title: "Features",
          description: "Main features of this application",
          items: [
            "Dynamic, configurable navigation",
            "Reactive layouts for mobile and desktop devices",
            "Keyboard navigation with shortcuts",
            "Command palette (Press ⌘K)",
            "Theme switching (light/dark)"
          ]
        },
        techStack: {
          title: "Tech Stack",
          description: "Technologies used",
          frontend: "Frontend:",
          styling: "Styling:",
          tooling: "Tooling:",
          button: "Start Demo"
        }
      }
    }
  },
  de: {
    translation: {
      welcomeTitle: "Willkommen bei Polity",
      welcomeSubtitle: "Eine TanStack Router Demo mit dynamischer Navigation",
      cards: {
        navigation: {
          title: "Navigation Demo",
          description: "Erleben Sie unsere dynamische Navigation mit verschiedenen Layouts",
          content: "Testen Sie verschiedene Navigationstypen, Prioritäten und Bildschirmkonfigurationen.",
          button: "Navigation Demo anzeigen"
        },
        features: {
          title: "Features",
          description: "Hauptfunktionen dieser Anwendung",
          items: [
            "Dynamische, konfigurierbare Navigation",
            "Reaktive Layouts für mobile und Desktop-Geräte",
            "Tastaturnavigation mit Shortcuts",
            "Kommandopalette (Drücken Sie ⌘K)",
            "Themenwechsel (hell/dunkel)"
          ]
        },
        techStack: {
          title: "Tech-Stack",
          description: "Verwendete Technologien",
          frontend: "Frontend:",
          styling: "Styling:",
          tooling: "Tooling:",
          button: "Demo starten"
        }
      }
    }
  }
};

i18n
  // Erkennt die Sprachpräferenz des Browsers
  .use(LanguageDetector)
  // Integriert i18next mit React
  .use(initReactI18next)
  // Initialisiert i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React escapes values already
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
export type Language = 'en' | 'de';
