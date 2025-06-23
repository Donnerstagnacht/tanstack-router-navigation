import { TogglePlugin } from '@platejs/toggle/react';

import { IndentKit } from '@/components/kit-platejs/indent-kit.tsx';
import { ToggleElement } from '@/components/ui-platejs/toggle-node.tsx';

export const ToggleKit = [...IndentKit, TogglePlugin.withComponent(ToggleElement)];
