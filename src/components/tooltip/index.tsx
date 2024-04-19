import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './styles.module.css';

const TooltipDemo: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={styles.TooltipContent}
            side='bottom'
            sideOffset={5}
          >
            Double click to rename
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipDemo;
