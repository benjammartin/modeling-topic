import SliceCard from '../card';
import Hereo from '@/slices/hereo';
import Box from '../primitives/box';
import styles from './styles.module.css';
import Feature from '@/slices/feature';
import CallToAction from '@/slices/cta';
import Testimonial from '@/slices/testimonial';

const TableSlice: React.FC = () => {
  return (
    <Box as='nav' className={styles.root}>
      <SliceCard id='hereo'>
        <Hereo />
      </SliceCard>
      <SliceCard id='testimonial'>
        <Testimonial />
      </SliceCard>
      <SliceCard id='features'>
        <Feature />
      </SliceCard>
      <SliceCard id='calltoaction'>
        <CallToAction />
      </SliceCard>
    </Box>
  );
};

export default TableSlice;
