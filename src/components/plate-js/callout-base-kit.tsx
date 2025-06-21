import { BaseCalloutPlugin } from '@platejs/callout';

import { CalloutElementStatic } from '@/components/ui/callout-node-static.tsx';

export const BaseCalloutKit = [BaseCalloutPlugin.withComponent(CalloutElementStatic)];
