import { BaseTogglePlugin } from '@platejs/toggle';

import { ToggleElementStatic } from '@/components/ui-platejs/toggle-node-static.tsx';

export const BaseToggleKit = [BaseTogglePlugin.withComponent(ToggleElementStatic)];
