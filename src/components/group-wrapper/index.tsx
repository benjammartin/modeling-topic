import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const GroupWrapper: React.FC<{
  children: React.ReactNode;
  label: string;
  number: string;
}> = ({ children, label, number, ...props }) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='header' className={styles.header}>
        {label}
        <Box className={styles.number}> • ({number})</Box>
      </Box>
      {children}
    </Box>
  );
};

export default GroupWrapper;
