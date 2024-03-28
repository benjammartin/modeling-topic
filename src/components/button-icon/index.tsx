import Box from '@/components/primitives/box';
import styles from './styles.module.css';

type DirProps = 'default' | 'middle' | 'left' | 'right';

const ButtonIcon: React.FC<{
  children: React.ReactNode;
  direction?: DirProps;
}> = ({ children, direction = 'default' }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Box
      as='button'
      onClick={handleClick}
      className={styles.root}
      data-direction={direction}
    >
      {children}
    </Box>
  );
};

export default ButtonIcon;
