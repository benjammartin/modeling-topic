import Box from '@/components/primitives/box';
import styles from './styles.module.css';

const Button: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Box as='button' onClick={handleClick} className={styles.root}>
      {children}
    </Box>
  );
};

export default Button;
