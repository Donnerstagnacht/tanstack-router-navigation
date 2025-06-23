import { BaseLinkPlugin } from '@platejs/link';

import { LinkElementStatic } from '@/components/ui-platejs/link-node-static.tsx';

export const BaseLinkKit = [BaseLinkPlugin.withComponent(LinkElementStatic)];
