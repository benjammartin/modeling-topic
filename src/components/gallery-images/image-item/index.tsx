import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import ButtonIcon from '@/components/button-icon';
import Trash from '@/components/icons/delete';

const ImageItem: React.FC<{ src: string }> = ({ src }) => {
  return (
    <Box as='div' className={styles.root}>
      <Box as='div' className={styles.left}>
        <Trash />
        <Box className={styles.thumbnail}>
          <Box as='img' src={src} />
        </Box>
      </Box>
      <Box as='div' className={styles.right}>
        <Box as='div' className={styles.top}>
          <Box>Image name</Box>
          <Box as='div' className={styles.actions}>
            <ButtonIcon>
              <Trash />
            </ButtonIcon>
            <ButtonIcon>
              <Trash />
            </ButtonIcon>
            <ButtonIcon>
              <Trash />
            </ButtonIcon>
          </Box>
        </Box>
        <Box className={styles.alt}>Alt</Box>
      </Box>
    </Box>
  );
};

export default ImageItem;
