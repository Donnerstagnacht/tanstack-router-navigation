import { BlockMenuPlugin } from '@platejs/selection/react';

import { BlockContextMenu } from '@/components/ui/block-context-menu.tsx';

import { BlockSelectionKit } from './block-selection-kit.tsx';

export const BlockMenuKit = [
  ...BlockSelectionKit,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
];
