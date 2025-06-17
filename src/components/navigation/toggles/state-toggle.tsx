'use client';

import * as React from 'react';
import { Circle, Menu, AlignLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type NavigationState = 'asButton' | 'asButtonList' | 'asLabeledButtonList';

interface StateButtonProps {
  state: NavigationState;
  currentState: NavigationState;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  size?: 'default' | 'small';
}

const StateButton = ({
  state,
  currentState,
  onClick,
  icon: Icon,
  title,
  size = 'default',
}: StateButtonProps) => {
  const isActive = currentState === state;

  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="icon"
      className={cn('h-8 w-8', size === 'small' && 'h-6 w-6')}
      onClick={onClick}
      title={title}
    >
      <Icon className={cn('h-4 w-4', size === 'small' && 'h-3 w-3')} />
    </Button>
  );
};

export function StateToggle({
  currentState,
  onStateChange,
  size = 'default',
  className,
}: {
  currentState: NavigationState;
  onStateChange: (state: NavigationState) => void;
  size?: 'default' | 'small';
  className?: string;
}) {
  const { t } = useTranslation();
  const icons = {
    asButton: Circle,
    asButtonList: Menu,
    asLabeledButtonList: AlignLeft,
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {' '}
      <StateButton
        state="asButton"
        currentState={currentState}
        onClick={() => onStateChange('asButton')}
        icon={icons.asButton}
        title={t('navigation.toggles.state.asButton')}
        size={size}
      />
      <StateButton
        state="asButtonList"
        currentState={currentState}
        onClick={() => onStateChange('asButtonList')}
        icon={icons.asButtonList}
        title={t('navigation.toggles.state.asButtonList')}
        size={size}
      />
      <StateButton
        state="asLabeledButtonList"
        currentState={currentState}
        onClick={() => onStateChange('asLabeledButtonList')}
        icon={icons.asLabeledButtonList}
        title={t('navigation.toggles.state.asLabeledButtonList')}
        size={size}
      />
    </div>
  );
}
