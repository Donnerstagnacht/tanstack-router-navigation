import * as React from 'react';

import type { WithRequiredKey } from 'platejs';

import {
  FloatingMedia as FloatingMediaPrimitive,
  FloatingMediaStore,
  useFloatingMediaValue,
  useImagePreviewValue,
} from '@platejs/media/react';
import { cva } from 'class-variance-authority';
import { Link, Trash2Icon } from 'lucide-react';
import {
  useEditorRef,
  useEditorSelector,
  useElement,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
} from 'platejs/react';

import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useTranslation } from 'react-i18next';

import { CaptionButton } from './caption.tsx';

const inputVariants = cva(
  'flex h-[28px] w-full rounded-md border-none bg-transparent px-1.5 py-1 text-base placeholder:text-muted-foreground focus-visible:ring-transparent focus-visible:outline-none md:text-sm'
);

export function MediaToolbar({
  children,
  plugin,
}: {
  children: React.ReactNode;
  plugin: WithRequiredKey;
}) {
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const { t } = useTranslation();

  const selectionCollapsed = useEditorSelector(editor => !editor.api.isExpanded(), []);
  const isImagePreviewOpen = useImagePreviewValue('isOpen', editor.id);
  const isOpen = !readOnly && selected && selectionCollapsed && !isImagePreviewOpen;
  const isEditing = useFloatingMediaValue('isEditing');

  React.useEffect(() => {
    if (!isOpen && isEditing) {
      FloatingMediaStore.set('isEditing', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const element = useElement();
  const { props: buttonProps } = useRemoveNodeButton({ element });

  if (readOnly) return <>{children}</>;

  return (
    <Popover open={isOpen} modal={false}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent className="w-auto p-1" onOpenAutoFocus={e => e.preventDefault()}>
        {isEditing ? (
          <div className="flex w-[330px] flex-col">
            <div className="flex items-center">
              <div className="text-muted-foreground flex items-center pr-1 pl-2">
                <Link className="size-4" />
              </div>

              <FloatingMediaPrimitive.UrlInput
                className={inputVariants()}
                placeholder={t(
                  'plateJs.media.toolbar.embedLinkPlaceholder',
                  'Paste the embed link...'
                )}
                options={{ plugin }}
              />
            </div>
          </div>
        ) : (
          <div className="box-content flex items-center">
            <FloatingMediaPrimitive.EditButton
              className={buttonVariants({ size: 'sm', variant: 'ghost' })}
            >
              {t('plateJs.media.toolbar.editLink', 'Edit link')}
            </FloatingMediaPrimitive.EditButton>

            <CaptionButton size="sm" variant="ghost">
              {t('plateJs.media.toolbar.caption', 'Caption')}
            </CaptionButton>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <Button size="sm" variant="ghost" {...buttonProps}>
              <Trash2Icon />
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
