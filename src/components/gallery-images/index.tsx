import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import React from 'react';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getFields } from '@/lib/get-props';
import List from '../primitives/list';
import ImageItem from './image-item';
import Medias from './medias';

const GalleryImages: React.FC<{
  id: string;
  name: string;
  value: string;
  type: string;
  format?: string;
}> = ({ name, id, ...props }) => {
  const { state, dispatch } = useCurrentAppContext();
  const ids = state.builder[id].children;
  const images = getFields(ids, state);
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_PROPS',
      payload: { id, name, value: e.target.value },
    });
  };

  return (
    <Box as='div' {...props} className={styles.root}>
      <Box as='label' className={styles.label}>
        <Box>{name}</Box>
      </Box>
      <Box as='div' onChange={onHandleChange} className={styles.input}>
        <List
          className={styles.list}
          items={images}
          renderItem={(item) => (
            <ImageItem key={item.id} src={item.props.src} />
          )}
        />
        <Medias parentId={id} />
      </Box>
    </Box>
  );
};

export default GalleryImages;
