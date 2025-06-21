import { TogglePlugin } from '@platejs/toggle/react';

import { IndentKit } from '@/components/plate-js/indent-kit.tsx';
import { ToggleElement } from '@/components/ui/toggle-node.tsx';

export const ToggleKit = [...IndentKit, TogglePlugin.withComponent(ToggleElement)];
