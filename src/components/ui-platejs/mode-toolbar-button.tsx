import * as React from 'react';

import { SuggestionPlugin } from '@platejs/suggestion/react';
import { type DropdownMenuProps, DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon, EyeIcon, PencilLineIcon, PenIcon } from 'lucide-react';
import { useEditorRef, usePlateState, usePluginOption } from 'platejs/react';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';

import { ToolbarButton } from '../ui/toolbar.tsx';

export function ModeToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [readOnly, setReadOnly] = usePlateState('readOnly');
  const [open, setOpen] = React.useState(false);

  const isSuggesting = usePluginOption(SuggestionPlugin, 'isSuggesting');

  const { t } = useTranslation();

  let value = 'editing';

  if (readOnly) value = 'viewing';

  if (isSuggesting) value = 'suggestion';

  const item: Record<string, { icon: React.ReactNode; label: string }> = {
    editing: {
      icon: <PenIcon />,
      label: t('plateJs.toolbar.mode.editing', 'Editing'),
    },
    suggestion: {
      icon: <PencilLineIcon />,
      label: t('plateJs.toolbar.mode.suggestion', 'Suggestion'),
    },
    viewing: {
      icon: <EyeIcon />,
      label: t('plateJs.toolbar.mode.viewing', 'Viewing'),
    },
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={open}
          tooltip={t('plateJs.toolbar.editingMode', 'Editing mode')}
          isDropdown
        >
          {item[value].icon}
          <span className="hidden lg:inline">{item[value].label}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[180px]" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={newValue => {
            if (newValue === 'viewing') {
              setReadOnly(true);

              return;
            } else {
              setReadOnly(false);
            }

            if (newValue === 'suggestion') {
              editor.setOption(SuggestionPlugin, 'isSuggesting', true);

              return;
            } else {
              editor.setOption(SuggestionPlugin, 'isSuggesting', false);
            }

            if (newValue === 'editing') {
              editor.tf.focus();

              return;
            }
          }}
        >
          <DropdownMenuRadioItem
            className="*:[svg]:text-muted-foreground pl-2 *:first:[span]:hidden"
            value="editing"
          >
            <Indicator />
            {item.editing.icon}
            {item.editing.label}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="*:[svg]:text-muted-foreground pl-2 *:first:[span]:hidden"
            value="viewing"
          >
            <Indicator />
            {item.viewing.icon}
            {item.viewing.label}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="*:[svg]:text-muted-foreground pl-2 *:first:[span]:hidden"
            value="suggestion"
          >
            <Indicator />
            {item.suggestion.icon}
            {item.suggestion.label}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Indicator() {
  return (
    <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <CheckIcon />
      </DropdownMenuItemIndicator>
    </span>
  );
}
