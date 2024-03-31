import SliceCard from '../card';
import Box from '../primitives/box';
import styles from './styles.module.css';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getSlices } from '@/lib/get-props';
import List from '../primitives/list';
import * as Slices from '@/slices';

const TableSlice: React.FC = () => {
  const { state } = useCurrentAppContext();
  const slices = getSlices(state.builder['root'], state);
  const list = Object.keys(slices);

  console.log(state);

  const renderSlice = (slice: string) => {
    const { id, props } = slices[slice];
    const Component = Slices.components[slice];

    return (
      <SliceCard key={id} id={id}>
        <Component {...props} />
      </SliceCard>
    );
  };

  return (
    <Box as='nav' className={styles.root}>
      <List items={list} renderItem={renderSlice} />
    </Box>
  );
};

export default TableSlice;
