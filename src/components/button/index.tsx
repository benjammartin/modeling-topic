import React, { ForwardedRef } from 'react';

import Box from '@/components/primitives/box';
import styles from './styles.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, onClick, style, ...props },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <Box
        as='button'
        onClick={onClick}
        className={styles.root}
        style={style}
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Button.displayName = 'Button';

export default Button;
