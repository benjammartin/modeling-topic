import SliceCard from '../card';
import Hereo from '@/slices/hereo';
import Box from '../primitives/box';
import styles from './styles.module.css';
import Feature from '@/slices/feature';

const TableSlice: React.FC = () => {
  return (
    <Box as='nav' className={styles.root}>
      <SliceCard>
        <Hereo />
      </SliceCard>
      <SliceCard>
        <Feature />
      </SliceCard>
      <SliceCard>
        <Hereo />
      </SliceCard>
    </Box>
  );
};

export default TableSlice;
