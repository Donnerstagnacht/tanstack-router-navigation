import { BaseSuggestionPlugin } from '@platejs/suggestion';

import { SuggestionLeafStatic } from '@/components/ui-platejs/suggestion-node-static.tsx';

export const BaseSuggestionKit = [BaseSuggestionPlugin.withComponent(SuggestionLeafStatic)];
