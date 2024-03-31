import SliceCard from '../card';
import Hereo from '@/slices/hereo';
import Box from '../primitives/box';
import styles from './styles.module.css';
import Feature from '@/slices/feature';
import CallToAction from '@/slices/cta';
import Testimonial from '@/slices/testimonial';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getProps } from '@/lib/get-props';

const TableSlice: React.FC = () => {
  const { state } = useCurrentAppContext();
  const props = getProps(state.builder['root'], state);

  console.log('props', props);
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
