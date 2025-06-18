import { AlignLeft, Circle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/i18n/i18n.types.ts';
import { useTranslation } from 'react-i18next';
import type { NavigationState, Size } from '@/navigation/types/navigation.types.tsx';

const StateButton = ({
  state,
  currentState,
  onClick,
  icon: Icon,
  title,
  size = 'default',
}: {
  state: NavigationState;
  currentState: NavigationState;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  size?: Size;
}) => {
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
  size?: Size;
  className?: string;
}) {
  const { t } = useTranslation();
  const stateIcons = {
    asButton: Circle,
    asButtonList: Menu,
    asLabeledButtonList: AlignLeft,
  };

  return (
    <div className={cn('flex gap-1', className)}>
      <StateButton
        state="asButton"
        currentState={currentState}
        onClick={() => onStateChange('asButton')}
        icon={stateIcons.asButton}
        title={t('navigation.toggles.state.asButton')}
        size={size}
      />
      <StateButton
        state="asButtonList"
        currentState={currentState}
        onClick={() => onStateChange('asButtonList')}
        icon={stateIcons.asButtonList}
        title={t('navigation.toggles.state.asButtonList')}
        size={size}
      />
      <StateButton
        state="asLabeledButtonList"
        currentState={currentState}
        onClick={() => onStateChange('asLabeledButtonList')}
        icon={stateIcons.asLabeledButtonList}
        title={t('navigation.toggles.state.asLabeledButtonList')}
        size={size}
      />
    </div>
  );
}
