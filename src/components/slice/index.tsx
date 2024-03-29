import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import { useCurrentAppContext } from '@/contexts/app-provider';

const Slice: React.FC<{
  children: React.ReactNode;
  label: string;
  id: string;
}> = ({ children, label, id, ...props }) => {
  const { state, dispatch } = useCurrentAppContext();

  const onSelect = () => {
    dispatch({ type: 'SELECT_ELEMENT', payload: id });
  };

  const isSelected = state.selected === id;

  return (
    <Box
      as='div'
      {...props}
      className={styles.root}
      data-selected={isSelected}
      onClick={onSelect}
    >
      <Box as='header' className={styles.header}>
        <Box>{label}</Box>
      </Box>
      <Box as='main' className={styles.main}>
        {children}
      </Box>
    </Box>
  );
};

export default Slice;
