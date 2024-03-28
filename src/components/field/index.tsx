import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Field: React.FC = ({ ...props }) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='label' className={styles.label}>
        <Box>Rich text • First paragraph</Box>
      </Box>
      <Box as='input' className={styles.input} />
    </Box>
  );
};

export default Field;
