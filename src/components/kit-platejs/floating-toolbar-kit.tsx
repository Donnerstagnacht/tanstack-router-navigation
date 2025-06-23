import { createPlatePlugin } from 'platejs/react';

import { FloatingToolbar } from '@/components/ui-platejs/floating-toolbar.tsx';
import { FloatingToolbarButtons } from '@/components/ui-platejs/floating-toolbar-buttons.tsx';

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      ),
    },
  }),
];
