import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const GroupWrapper: React.FC<{
  children: React.ReactNode;
  action: () => void;
  label: string;
  number: string;
  collaps: boolean;
}> = ({ children, label, number, action, collaps, ...props }) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='header' className={styles.header}>
        <Box>
          {label}
          <Box className={styles.number}> • ({number})</Box>
        </Box>
        <button style={{ color: '#6E56CF' }} onClick={action}>
          {collaps ? 'Collapse All' : 'Expand All'}
        </button>
      </Box>
      {children}
    </Box>
  );
};

export default GroupWrapper;
