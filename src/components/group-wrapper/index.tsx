import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const GroupWrapper: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
  ...props
}) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='header' className={styles.header}>
        {label + 's'}
      </Box>
      {children}
    </Box>
  );
};

export default GroupWrapper;
