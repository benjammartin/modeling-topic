import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import React from 'react';
import { useCurrentAppContext } from '@/contexts/app-provider';

const Field: React.FC<{
  id: string;
  name: string;
  value: string;
  type: Omit<SolutionOneFieldType, 'group-item'>;
}> = ({ name, value, id, ...props }) => {
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
        value={state.builder[id].props[name] || value}
        className={styles.input}
        data-type={props.type}
      />
    </Box>
  );
};

export default Field;
