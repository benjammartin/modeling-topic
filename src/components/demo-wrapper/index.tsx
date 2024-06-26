import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Demo: React.FC<{
  children: React.ReactNode;
}> = ({ children, ...props }) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      {children}
    </Box>
  );
};

export default Demo;
