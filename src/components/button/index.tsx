import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Button: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick, ...props }) => {
  return (
    <Box as='button' onClick={onClick} className={styles.root} {...props}>
      {children}
    </Box>
  );
};

export default Button;
