import Button from '@/components/button';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './styles.module.css';
import Box from '@/components/primitives/box';
import List from '@/components/primitives/list';
import { useCurrentAppContext } from '@/contexts/app-provider';
import React from 'react';

import michelin from '../../../assets/michelin.png';
import vegi from '../../../assets/vegi.png';

const medias = [{ src: michelin }, { src: vegi }];

const Medias: React.FC<{ parentId: string }> = ({ parentId }) => {
  const { dispatch } = useCurrentAppContext();
  const [open, setOpen] = React.useState(false);

  const onAddNewMedia = (src: string) => {
    dispatch({
      type: 'ADD_IMAGE',
      payload: {
        src,
        id: parentId,
      },
    });
    setOpen(!open);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setOpen(!open)}>Add new item</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={styles.DialogOverlay}
          onClick={() => setOpen(!open)}
        />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>Medias</Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            Add a new media
          </Dialog.Description>
          <Box as='div'>
            <List
              className={styles.MediasGrid}
              items={medias}
              renderItem={({ src }) => (
                <Box
                  as='div'
                  onClick={() => onAddNewMedia(src)}
                  className={styles.Media}
                >
                  <Box as='img' src={src} />
                </Box>
              )}
            />
          </Box>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Medias;
