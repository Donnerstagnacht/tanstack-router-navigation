import { MentionInputPlugin, MentionPlugin } from '@platejs/mention/react';

import { MentionElement, MentionInputElement } from '@/components/ui-platejs/mention-node.tsx';

export const MentionKit = [
  MentionPlugin.configure({
    options: { triggerPreviousCharPattern: /^$|^[\s"']$/ },
  }).withComponent(MentionElement),
  MentionInputPlugin.withComponent(MentionInputElement),
];
