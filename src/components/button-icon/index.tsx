import Box from '@/components/primitives/box';
import styles from './styles.module.css';

type DirProps = 'default' | 'middle' | 'left' | 'right';

const ButtonIcon: React.FC<{
  children: React.ReactNode;
  direction?: DirProps;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ children, direction = 'default', onClick }) => {
  return (
    <Box
      as='button'
      onClick={onClick}
      className={styles.root}
      data-direction={direction}
    >
      {children}
    </Box>
  );
};

export default ButtonIcon;
