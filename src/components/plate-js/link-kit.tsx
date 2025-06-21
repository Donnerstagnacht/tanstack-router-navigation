import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '@/components/ui/link-node.tsx';
import { LinkFloatingToolbar } from '@/components/ui/link-toolbar.tsx';

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
