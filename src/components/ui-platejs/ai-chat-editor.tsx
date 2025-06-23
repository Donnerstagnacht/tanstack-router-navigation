import * as React from 'react';

import { useAIChatEditor } from '@platejs/ai/react';
import { usePlateEditor } from 'platejs/react';

import { BaseEditorKit } from '@/components/kit-platejs/editor-base-kit.tsx';

import { EditorStatic } from './editor-static.tsx';

export const AIChatEditor = React.memo(function AIChatEditor({ content }: { content: string }) {
  const aiEditor = usePlateEditor({
    plugins: BaseEditorKit,
  });

  useAIChatEditor(aiEditor, content);

  return <EditorStatic variant="aiChat" editor={aiEditor} />;
});
