import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import ButtonIcon from '@/components/button-icon';
import Trash from '@/components/icons/delete';
import Drag from '@/components/icons/drag';

const ImageItem: React.FC<{ src: string }> = ({ src }) => {
  return (
    <Box as='div' className={styles.root}>
      <Box as='div' className={styles.left}>
        <Drag />
        <Box className={styles.thumbnail}>
          <Box as='img' src={src} />
        </Box>
      </Box>
      <Box as='div' className={styles.right}>
        <Box as='div' className={styles.top}>
          <Box as='p' className={styles.name}>
            Image name
          </Box>
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
        <Box className={styles.altwrapper}>
          <Box as='span' className={styles.alt}>
            Alt text
          </Box>
          <Box as='input' placeholder='Alt text' className={styles.input} />
        </Box>
      </Box>
    </Box>
  );
};

export default ImageItem;
