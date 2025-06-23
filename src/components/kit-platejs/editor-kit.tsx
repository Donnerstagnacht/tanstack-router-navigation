import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AIKit } from '@/components/kit-platejs/ai-kit.tsx';
import { AlignKit } from '@/components/kit-platejs/align-kit.tsx';
import { AutoformatKit } from '@/components/kit-platejs/autoformat-kit.tsx';
import { BasicBlocksKit } from '@/components/kit-platejs/basic-blocks-kit.tsx';
import { BasicMarksKit } from '@/components/kit-platejs/basic-marks-kit.tsx';
import { BlockMenuKit } from '@/components/kit-platejs/block-menu-kit.tsx';
import { BlockPlaceholderKit } from '@/components/kit-platejs/block-placeholder-kit.tsx';
import { CalloutKit } from '@/components/kit-platejs/callout-kit.tsx';
import { CodeBlockKit } from '@/components/kit-platejs/code-block-kit.tsx';
import { ColumnKit } from '@/components/kit-platejs/column-kit.tsx';
import { CommentKit } from '@/components/kit-platejs/comment-kit.tsx';
import { CopilotKit } from '@/components/kit-platejs/copilot-kit.tsx';
import { CursorOverlayKit } from '@/components/kit-platejs/cursor-overlay-kit.tsx';
import { DateKit } from '@/components/kit-platejs/date-kit.tsx';
import { DiscussionKit } from '@/components/kit-platejs/discussion-kit.tsx';
import { DndKit } from '@/components/kit-platejs/dnd-kit.tsx';
import { DocxKit } from '@/components/kit-platejs/docx-kit.tsx';
import { EmojiKit } from '@/components/kit-platejs/emoji-kit.tsx';
import { ExitBreakKit } from '@/components/kit-platejs/exit-break-kit.tsx';
import { FixedToolbarKit } from '@/components/kit-platejs/fixed-toolbar-kit.tsx';
import { FloatingToolbarKit } from '@/components/kit-platejs/floating-toolbar-kit.tsx';
import { FontKit } from '@/components/kit-platejs/font-kit.tsx';
import { LineHeightKit } from '@/components/kit-platejs/line-height-kit.tsx';
import { LinkKit } from '@/components/kit-platejs/link-kit.tsx';
import { ListKit } from '@/components/kit-platejs/list-kit.tsx';
import { MarkdownKit } from '@/components/kit-platejs/markdown-kit.tsx';
import { MathKit } from '@/components/kit-platejs/math-kit.tsx';
import { MediaKit } from '@/components/kit-platejs/media-kit.tsx';
import { MentionKit } from '@/components/kit-platejs/mention-kit.tsx';
import { SlashKit } from '@/components/kit-platejs/slash-kit.tsx';
import { SuggestionKit } from '@/components/kit-platejs/suggestion-kit.tsx';
import { TableKit } from '@/components/kit-platejs/table-kit.tsx';
import { TocKit } from '@/components/kit-platejs/toc-kit.tsx';
import { ToggleKit } from '@/components/kit-platejs/toggle-kit.tsx';

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
