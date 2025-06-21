import { CursorOverlayPlugin } from '@platejs/selection/react';

import { CursorOverlay } from '@/components/ui/cursor-overlay.tsx';

export const CursorOverlayKit = [
  CursorOverlayPlugin.configure({
    render: {
      afterEditable: () => <CursorOverlay />,
    },
  }),
];
