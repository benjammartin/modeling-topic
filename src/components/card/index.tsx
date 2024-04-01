import { useCurrentAppContext } from '@/contexts/app-provider';
import Frame from '../frame';
import Drag from '../icons/drag';
import More from '../icons/more';
import Box from '../primitives/box';
import styles from './styles.module.css';
import * as Card from '@/components/primitives/card';

const SliceCard: React.FC<{
  children: React.ReactNode;
  id: string;
  name: string;
}> = ({ children, id, name }) => {
  const { state, dispatch } = useCurrentAppContext();

  const handleScroll = (ref: React.RefObject<HTMLElement>) => {
    const element = ref.current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  const onSelect = () => {
    console.log('onSelect', id);
    dispatch({ type: 'SELECT_ELEMENT', payload: id });
    handleScroll(state.anchors[id]);
  };

  const isSelected = state.selected === id;

  return (
    <Card.Root
      className={styles.root}
      onClick={onSelect}
      data-selected={isSelected}
    >
      <Card.Preview className={styles.preview}>
        <Box as='div' className={styles.display}>
          <Box as='div'>1</Box>
          <Box as='div' className={styles.main}>
            <Frame>{children}</Frame>
          </Box>
          <Drag />
        </Box>
      </Card.Preview>
      <Card.Metas className={styles.metas}>
        <Box>
          <Box as='p' className={styles.title}>
            {name}
          </Box>
          <Box as='p' className={styles.variation}>
            Default
          </Box>
        </Box>
        <More />
      </Card.Metas>
    </Card.Root>
  );
};

export default SliceCard;
