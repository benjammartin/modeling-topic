import Box from '@/components/primitives/box';
import styles from './styles.module.css';
import React from 'react';

const Field: React.FC<{
  name: string;
  value: string;
  type: Omit<SolutionOneFieldType, 'group-item'>;
}> = ({ name, value, ...props }) => {
  const [state, setState] = React.useState<string>(value);
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
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
        value={state}
        className={styles.input}
        data-type={props.type}
      />
    </Box>
  );
};

export default Field;
