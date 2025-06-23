import { CursorOverlayPlugin } from '@platejs/selection/react';

import { CursorOverlay } from '@/components/ui-platejs/cursor-overlay.tsx';

export const CursorOverlayKit = [
  CursorOverlayPlugin.configure({
    render: {
      afterEditable: () => <CursorOverlay />,
    },
  }),
];
