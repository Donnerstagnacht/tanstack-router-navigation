import * as React from 'react';

import type { TLinkElement } from 'platejs';

import { type UseVirtualFloatingOptions, flip, offset } from '@platejs/floating';
import { getLinkAttributes } from '@platejs/link';
import {
  type LinkFloatingToolbarState,
  FloatingLinkUrlInput,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkInsert,
  useFloatingLinkInsertState,
} from '@platejs/link/react';
import { cva } from 'class-variance-authority';
import { ExternalLink, Link, Text, Unlink } from 'lucide-react';
import { KEYS } from 'platejs';
import { useTranslation } from 'react-i18next';
import {
  useEditorRef,
  useEditorSelection,
  useFormInputProps,
  usePluginOption,
} from 'platejs/react';

import { buttonVariants } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';

const popoverVariants = cva(
  'z-50 w-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-hidden'
);

const inputVariants = cva(
  'flex h-[28px] w-full rounded-md border-none bg-transparent px-1.5 py-1 text-base placeholder:text-muted-foreground focus-visible:ring-transparent focus-visible:outline-none md:text-sm'
);

export function LinkFloatingToolbar({ state }: { state?: LinkFloatingToolbarState }) {
  const activeCommentId = usePluginOption({ key: KEYS.comment }, 'activeId');
  const activeSuggestionId = usePluginOption({ key: KEYS.suggestion }, 'activeId');
  const { t } = useTranslation();

  const floatingOptions: UseVirtualFloatingOptions = React.useMemo(() => {
    return {
      middleware: [
        offset(8),
        flip({
          fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
          padding: 12,
        }),
      ],
      placement: activeSuggestionId || activeCommentId ? 'top-start' : 'bottom-start',
    };
  }, [activeCommentId, activeSuggestionId]);

  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    hidden,
    props: insertProps,
    ref: insertRef,
    textInputProps,
  } = useFloatingLinkInsert(insertState);

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps,
  } = useFloatingLinkEdit(editState);
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  });

  if (hidden) return null;

  const input = (
    <div className="flex w-[330px] flex-col" {...inputProps}>
      <div className="flex items-center">
        <div className="text-muted-foreground flex items-center pr-1 pl-2">
          <Link className="size-4" />
        </div>

        <FloatingLinkUrlInput
          className={inputVariants()}
          placeholder={t('plateJs.toolbar.pasteLink', 'Paste link')}
          data-plate-focus
        />
      </div>
      <Separator className="my-1" />
      <div className="flex items-center">
        <div className="text-muted-foreground flex items-center pr-1 pl-2">
          <Text className="size-4" />
        </div>
        <input
          className={inputVariants()}
          placeholder={t('plateJs.toolbar.textToDisplay', 'Text to display')}
          data-plate-focus
          {...textInputProps}
        />
      </div>
    </div>
  );

  const editContent = editState.isEditing ? (
    input
  ) : (
    <div className="box-content flex items-center">
      <button
        className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        type="button"
        {...editButtonProps}
      >
        {t('plateJs.toolbar.editLink', 'Edit link')}
      </button>

      <Separator orientation="vertical" />

      <LinkOpenButton />

      <Separator orientation="vertical" />

      <button
        className={buttonVariants({
          size: 'sm',
          variant: 'ghost',
        })}
        type="button"
        {...unlinkButtonProps}
      >
        <Unlink width={18} aria-label={t('plateJs.toolbar.unlink', 'Unlink')} />
      </button>
    </div>
  );

  return (
    <>
      <div ref={insertRef} className={popoverVariants()} {...insertProps}>
        {input}
      </div>

      <div ref={editRef} className={popoverVariants()} {...editProps}>
        {editContent}
      </div>
    </>
  );
}

function LinkOpenButton() {
  const editor = useEditorRef();
  const selection = useEditorSelection();
  const { t } = useTranslation();

  const attributes = React.useMemo(
    () => {
      const entry = editor.api.node<TLinkElement>({
        match: { type: editor.getType(KEYS.link) },
      });
      if (!entry) {
        return {};
      }
      const [element] = entry;
      return getLinkAttributes(editor, element);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor, selection]
  );

  return (
    <a
      {...attributes}
      className={buttonVariants({
        size: 'sm',
        variant: 'ghost',
      })}
      onMouseOver={e => {
        e.stopPropagation();
      }}
      aria-label={t('plateJs.toolbar.openInNewTab', 'Open link in a new tab')}
      target="_blank"
    >
      <ExternalLink width={18} />
    </a>
  );
}
