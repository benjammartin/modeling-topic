import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Slice: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
  ...props
}) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='header' className={styles.header}>
        <Box>{label}</Box>
      </Box>
      <Box as='main' className={styles.main}>
        {children}
      </Box>
    </Box>
  );
};

export default Slice;
