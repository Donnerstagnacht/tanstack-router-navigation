import type { TDateElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';

import { PlateElement, useReadOnly } from 'platejs/react';
import { useTranslation } from 'react-i18next';

import { Calendar } from '@/components/ui/calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';

export function DateElement(props: PlateElementProps<TDateElement>) {
  const { editor, element } = props;
  const { t } = useTranslation();
  const readOnly = useReadOnly();

  const trigger = (
    <span
      className={cn('bg-muted text-muted-foreground w-fit cursor-pointer rounded-sm px-1')}
      contentEditable={false}
      draggable
    >
      {element.date ? (
        (() => {
          const today = new Date();
          const elementDate = new Date(element.date);
          const isToday =
            elementDate.getDate() === today.getDate() &&
            elementDate.getMonth() === today.getMonth() &&
            elementDate.getFullYear() === today.getFullYear();

          const isYesterday =
            new Date(today.setDate(today.getDate() - 1)).toDateString() ===
            elementDate.toDateString();
          const isTomorrow =
            new Date(today.setDate(today.getDate() + 2)).toDateString() ===
            elementDate.toDateString();

          if (isToday) return t('dateElement.today');
          if (isYesterday) return t('dateElement.yesterday');
          if (isTomorrow) return t('dateElement.tomorrow');

          return elementDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        })()
      ) : (
        <span>{t('dateElement.pickDate')}</span>
      )}
    </span>
  );

  if (readOnly) {
    return trigger;
  }

  return (
    <PlateElement
      {...props}
      className="inline-block"
      attributes={{
        ...props.attributes,
        contentEditable: false,
      }}
    >
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            selected={new Date(element.date as string)}
            onSelect={date => {
              if (!date) return;

              editor.tf.setNodes({ date: date.toDateString() }, { at: element });
            }}
            mode="single"
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {props.children}
    </PlateElement>
  );
}
