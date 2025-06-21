import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AIKit } from '@/components/plate-js/ai-kit.tsx';
import { AlignKit } from '@/components/plate-js/align-kit.tsx';
import { AutoformatKit } from '@/components/plate-js/autoformat-kit.tsx';
import { BasicBlocksKit } from '@/components/plate-js/basic-blocks-kit.tsx';
import { BasicMarksKit } from '@/components/plate-js/basic-marks-kit.tsx';
import { BlockMenuKit } from '@/components/plate-js/block-menu-kit.tsx';
import { BlockPlaceholderKit } from '@/components/plate-js/block-placeholder-kit.tsx';
import { CalloutKit } from '@/components/plate-js/callout-kit.tsx';
import { CodeBlockKit } from '@/components/plate-js/code-block-kit.tsx';
import { ColumnKit } from '@/components/plate-js/column-kit.tsx';
import { CommentKit } from '@/components/plate-js/comment-kit.tsx';
import { CopilotKit } from '@/components/plate-js/copilot-kit.tsx';
import { CursorOverlayKit } from '@/components/plate-js/cursor-overlay-kit.tsx';
import { DateKit } from '@/components/plate-js/date-kit.tsx';
import { DiscussionKit } from '@/components/plate-js/discussion-kit.tsx';
import { DndKit } from '@/components/plate-js/dnd-kit.tsx';
import { DocxKit } from '@/components/plate-js/docx-kit.tsx';
import { EmojiKit } from '@/components/plate-js/emoji-kit.tsx';
import { ExitBreakKit } from '@/components/plate-js/exit-break-kit.tsx';
import { FixedToolbarKit } from '@/components/plate-js/fixed-toolbar-kit.tsx';
import { FloatingToolbarKit } from '@/components/plate-js/floating-toolbar-kit.tsx';
import { FontKit } from '@/components/plate-js/font-kit.tsx';
import { LineHeightKit } from '@/components/plate-js/line-height-kit.tsx';
import { LinkKit } from '@/components/plate-js/link-kit.tsx';
import { ListKit } from '@/components/plate-js/list-kit.tsx';
import { MarkdownKit } from '@/components/plate-js/markdown-kit.tsx';
import { MathKit } from '@/components/plate-js/math-kit.tsx';
import { MediaKit } from '@/components/plate-js/media-kit.tsx';
import { MentionKit } from '@/components/plate-js/mention-kit.tsx';
import { SlashKit } from '@/components/plate-js/slash-kit.tsx';
import { SuggestionKit } from '@/components/plate-js/suggestion-kit.tsx';
import { TableKit } from '@/components/plate-js/table-kit.tsx';
import { TocKit } from '@/components/plate-js/toc-kit.tsx';
import { ToggleKit } from '@/components/plate-js/toggle-kit.tsx';

export const EditorKit = [
  ...CopilotKit,
  ...AIKit,

  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  ...MathKit,
  ...DateKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Collaboration
  ...DiscussionKit,
  ...CommentKit,
  ...SuggestionKit,

  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  ...BlockMenuKit,
  ...DndKit,
  ...EmojiKit,
  ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  ...DocxKit,
  ...MarkdownKit,

  // UI
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();
