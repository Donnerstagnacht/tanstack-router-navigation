import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '@/components/ui-platejs/link-node.tsx';
import { LinkFloatingToolbar } from '@/components/ui-platejs/link-toolbar.tsx';

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
