import Box from '@/components/primitives/box';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getSlices } from '@/lib/get-props';
import * as Slices from '@/slices';
import List from '@/components/primitives/list';

const Preview: React.FC = () => {
  const { state } = useCurrentAppContext();
  const slices = getSlices(state.builder['root'], state);
  const list = Object.keys(slices);

  const renderSlice = (slice: string) => {
    const { props } = slices[slice];
    const Component = Slices.components[slice];
    return <Component {...props} />;
  };

  return (
    <Box>
      <List items={list} renderItem={renderSlice} />
    </Box>
  );
};

export default Preview;
