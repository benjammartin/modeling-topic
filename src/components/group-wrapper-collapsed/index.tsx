import Box from '@/components/primitives/box';
import * as Collapsible from '@radix-ui/react-collapsible';
import styles from './styles.module.css';
import Chevron from '../icons/chevron';

const GroupWrapperCollapsed: React.FC<{
  children: React.ReactNode;
  label: string;
}> = ({ children, label, ...props }) => {
  return (
    <Collapsible.Root {...props} className={styles.root}>
      <Collapsible.Trigger asChild className={styles.trigger}>
        <Box as='header' className={styles.header}>
          {label + 's'} <Chevron className={styles.chevron} />
        </Box>
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

export default GroupWrapperCollapsed;

/** <Box as='div' {...props} className={styles.root}>
      <Box as='header' className={styles.header}>
        {label + 's'}
      </Box>
      {children}
    </Box> */
