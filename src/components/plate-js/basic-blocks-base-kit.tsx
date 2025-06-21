import {
  BaseBlockquotePlugin,
  BaseH1Plugin,
  BaseH2Plugin,
  BaseH3Plugin,
  BaseHorizontalRulePlugin,
} from '@platejs/basic-nodes';
import { BaseParagraphPlugin } from 'platejs';

import { BlockquoteElementStatic } from '@/components/ui/blockquote-node-static.tsx';
import {
  H1ElementStatic,
  H2ElementStatic,
  H3ElementStatic,
} from '@/components/ui/heading-node-static.tsx';
import { HrElementStatic } from '@/components/ui/hr-node-static.tsx';
import { ParagraphElementStatic } from '@/components/ui/paragraph-node-static.tsx';

export const BaseBasicBlocksKit = [
  BaseParagraphPlugin.withComponent(ParagraphElementStatic),
  BaseH1Plugin.withComponent(H1ElementStatic),
  BaseH2Plugin.withComponent(H2ElementStatic),
  BaseH3Plugin.withComponent(H3ElementStatic),
  BaseBlockquotePlugin.withComponent(BlockquoteElementStatic),
  BaseHorizontalRulePlugin.withComponent(HrElementStatic),
];
