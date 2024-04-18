import Box from '@/components/primitives/box';
import styles from './styles.module.css';

type DirProps = 'default' | 'middle' | 'left' | 'right';
type TypeProps = 'filled' | 'ghost' | 'outline';

const ButtonIcon: React.FC<{
  children: React.ReactNode;
  direction?: DirProps;
  type?: TypeProps;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ children, direction = 'default', type = 'filled', onClick }) => {
  return (
    <Box
      as='button'
      onClick={onClick}
      className={styles.root}
      data-direction={direction}
      data-type={type}
    >
      {children}
    </Box>
  );
};

export default ButtonIcon;
