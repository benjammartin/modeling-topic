import * as Nav from '@/components/primitives/navigation/navigation';
import Button from '../button';
import Box from '../primitives/box';
import styles from './styles.module.css';
import Search from '../search';

const Navigation: React.FC = () => {
  return (
    <Box as='div' className={styles.root}>
      <Nav.Root className={styles.navigation}>
        <Nav.Group className={styles.document}>
          <Button onClick={() => null}>Back</Button>
          <Box as='div'>Document title</Box>
          <Search />
        </Nav.Group>
        <Nav.Group className={styles.actions}>
          <Button onClick={() => null}>Save</Button>
          <Button onClick={() => null}>Unpublish</Button>
        </Nav.Group>
      </Nav.Root>
    </Box>
  );
};

export default Navigation;
