import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { Scramble } from '../scramble';

const Slice: React.FC<{
  children: React.ReactNode;
  label: string;
  id: string;
}> = ({ children, label, id, ...props }) => {
  const { state, dispatch } = useCurrentAppContext();

  const onSelect = () => {
    dispatch({ type: 'SELECT_SLICE', payload: id });
  };

  const isSelected = state.selected === id;

  return (
    <Box
      ref={state.anchors[id]}
      as='div'
      {...props}
      className={styles.root}
      data-selected={isSelected}
      onClick={onSelect}
    >
      <Box as='header' className={styles.header}>
        <Box>
          <Scramble content={label} size={2} />
        </Box>
      </Box>
      <Box as='main' className={styles.main}>
        {children}
      </Box>
    </Box>
  );
};

export default Slice;
