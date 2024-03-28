import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Field: React.FC<{
  name: string;
  value: string;
  type: Omit<SolutionOneFieldType, 'group-item'>;
}> = ({ name, value, ...props }) => {
  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='label' className={styles.label}>
        <Box>{name}</Box>
      </Box>
      <Box
        as='input'
        placeholder='Field content'
        value={value}
        className={styles.input}
        data-type={props.type}
      />
    </Box>
  );
};

export default Field;
