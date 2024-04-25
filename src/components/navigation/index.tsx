import * as Nav from '@/components/primitives/navigation/navigation';
import Button from '../button';
import Box from '../primitives/box';
import styles from './styles.module.css';

const Navigation: React.FC = () => {
  return (
    <Box as='div' className={styles.root}>
      <Nav.Root className={styles.navigation}>
        <Nav.Group className={styles.document}>
          <Button onClick={() => null}>Back</Button>
          <Box as='div'>Document title</Box>
        </Nav.Group>
        <Nav.Group className={styles.actions}>
          <Box as='div'>Looking for something? Try ⌘ + k </Box>
          <Button onClick={() => null}>Save</Button>
          <Button onClick={() => null}>Unpublish</Button>
        </Nav.Group>
      </Nav.Root>
    </Box>
  );
};

export default Navigation;
