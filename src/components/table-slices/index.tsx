import SliceCard from '../card';
import Hereo from '@/slices/hereo';
import Box from '../primitives/box';
import styles from './styles.module.css';

const TableSlice: React.FC = () => {
  return (
    <Box as='nav' className={styles.root}>
      <SliceCard>
        <Hereo />
      </SliceCard>
      <SliceCard>
        <Hereo />
      </SliceCard>
      <SliceCard>
        <Hereo />
      </SliceCard>
    </Box>
  );
};

export default TableSlice;
