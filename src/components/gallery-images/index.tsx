import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import React from 'react';
import { useCurrentAppContext } from '@/contexts/app-provider';
import Button from '../button';
import { getFields } from '@/lib/get-props';
import List from '../primitives/list';
import ImageItem from './image-item';

const GalleryImages: React.FC<{
  id: string;
  name: string;
  value: string;
  type: string;
  format?: string;
}> = ({ name, value, id, format = 'text', ...props }) => {
  const { state, dispatch } = useCurrentAppContext();
  const ids = state.builder[id].children;
  const images = getFields(ids, state);
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_PROPS',
      payload: { id, name, value: e.target.value },
    });
  };

  const onAddNewItem = async () => {
    dispatch({
      type: 'ADD_IMAGE',
      payload: {
        id: id,
      },
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
        <Button onClick={onAddNewItem}>Add new image</Button>
      </Box>
    </Box>
  );
};

export default GalleryImages;

/**  <Box
          as='input'
          onChange={onHandleChange}
          placeholder='Field content'
          type='file'
          value=''
          className={styles.input}
          data-format={format}
        /> */
