import { createPlatePlugin } from 'platejs/react';

import { FixedToolbar } from '@/components/ui-platejs/fixed-toolbar.tsx';
import { FixedToolbarButtons } from '@/components/ui-platejs/fixed-toolbar-buttons.tsx';

export const FixedToolbarKit = [
  createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
      ),
    },
  }),
];
