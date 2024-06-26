import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import React from 'react';
import { useCurrentAppContext } from '@/contexts/app-provider';

const Field: React.FC<{
  id: string;
  name: string;
  value: string;
  type: string;
  format?: string;
}> = ({ name, id, format = 'text', ...props }) => {
  const { state, dispatch } = useCurrentAppContext();
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
      <Box
        as='input'
        onChange={onHandleChange}
        placeholder='Field content'
        value={state.builder[id].props[name]}
        className={styles.input}
        data-format={format}
      />
    </Box>
  );
};

export default Field;
