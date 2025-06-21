import { EquationPlugin, InlineEquationPlugin } from '@platejs/math/react';

import { EquationElement, InlineEquationElement } from '@/components/ui/equation-node.tsx';

export const MathKit = [
  InlineEquationPlugin.withComponent(InlineEquationElement),
  EquationPlugin.withComponent(EquationElement),
];
