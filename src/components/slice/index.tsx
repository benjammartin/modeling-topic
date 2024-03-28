import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Slice: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='header' className={styles.header}>
        <Box>Slice name</Box>
      </Box>
      <Box as='main' className={styles.main}>
        {children}
      </Box>
    </Box>
  );
};

export default Slice;
