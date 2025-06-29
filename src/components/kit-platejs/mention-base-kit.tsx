import { BaseMentionPlugin } from '@platejs/mention';

import { MentionElementStatic } from '@/components/ui-platejs/mention-node-static.tsx';

export const BaseMentionKit = [BaseMentionPlugin.withComponent(MentionElementStatic)];
