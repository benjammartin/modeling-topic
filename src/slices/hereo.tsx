import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Hereo = () => {
  return (
    <Box as='div' className={styles.root}>
      <Box as='h1'>Hereo</Box>
      <Box as='p'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Box>
    </Box>
  );
};

export default Hereo;
