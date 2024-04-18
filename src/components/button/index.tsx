import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Button: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}> = ({ children, onClick, style, ...props }) => {
  return (
    <Box
      as='button'
      onClick={onClick}
      className={styles.root}
      style={style}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Button;
