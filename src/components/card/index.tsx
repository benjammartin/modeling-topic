import Frame from '../frame';
import Drag from '../icons/drag';
import More from '../icons/more';
import Box from '../primitives/box';
import styles from './styles.module.css';
import * as Card from '@/components/primitives/card';

const SliceCard: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Card.Root className={styles.root}>
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
            Header
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
