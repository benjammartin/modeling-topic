import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './styles.module.css';

const TooltipDemo: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label = 'Content',
}) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={styles.TooltipContent}
            side='bottom'
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipDemo;
