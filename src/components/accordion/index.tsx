import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import * as RadixAccordion from '@radix-ui/react-accordion';
import styles from './styles.module.css';
import React, { Fragment } from 'react';
import Field from '../field';
import Item from '../icons/item';
import Chevron from '../icons/chevron';
import ButtonIcon from '@/components/button-icon';
import Trash from '../icons/delete';
import Movedown from '../icons/movedown';
import Moveup from '../icons/moveup';
import Button from '../button';

const Accordion: React.FC<{
  items: Array<SolutionOneGroupItem>;
  label: string;
}> = ({ items, label }) => {
  const [state, setState] = React.useState(items);
  const [prime] = items;

  const addNewItem = () => {
    const newItem: SolutionOneGroupItem = {
      id: String(state.length + 1),
      type: 'group-item',
      fields: [...prime.fields],
    };
    setState([...state, newItem]);
  };

  return (
    <Fragment>
      <RadixAccordion.Root
        type='single'
        defaultValue={prime.id}
        collapsible
        className={styles.root}
        orientation='vertical'
      >
        <List
          items={state}
          renderItem={(item, i) => (
            <AccordionItem className={styles.item} key={i} value={item.id}>
              <AccordionTrigger className={styles.trigger}>
                <Box as='span'>
                  <Chevron className={styles.chevron} />
                  <Item /> {`${label} - ${item.id}`}
                </Box>
                <Box className={styles.actions}>
                  <Box className={styles.move}>
                    <ButtonIcon direction='left'>
                      <Movedown />
                    </ButtonIcon>
                    <ButtonIcon direction='right'>
                      <Moveup />
                    </ButtonIcon>
                  </Box>
                  <ButtonIcon>
                    <Trash />
                  </ButtonIcon>
                </Box>
              </AccordionTrigger>
              <AccordionContent className={styles.content}>
                <List
                  className={styles.list}
                  items={item.fields}
                  renderItem={(item, key) => (
                    <Field
                      type={item.type}
                      name={item.name}
                      value={item.value}
                      key={key}
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          )}
        />
      </RadixAccordion.Root>
      <Box as='footer' className={styles.footer}>
        <Button onClick={addNewItem}>
          Add new {label.toLocaleLowerCase()}
        </Button>
      </Box>
    </Fragment>
  );
};

const AccordionItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  value: string;
}> = React.forwardRef(
  (
    { children, className, value, ...props },
    forwardedRef: React.Ref<HTMLDivElement>,
  ) => (
    <RadixAccordion.Item
      className={className}
      ref={forwardedRef}
      value={value}
      {...props}
    >
      {children}
    </RadixAccordion.Item>
  ),
);

const AccordionTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = React.forwardRef(
  (
    { children, className, ...props },
    forwardedRef: React.Ref<HTMLButtonElement>,
  ) => (
    <RadixAccordion.Header className={styles.header}>
      <RadixAccordion.Trigger
        className={className}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  ),
);

const AccordionContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = React.forwardRef(
  (
    { children, className, ...props },
    forwardedRef: React.Ref<HTMLDivElement>,
  ) => (
    <RadixAccordion.Content ref={forwardedRef} {...props}>
      <Box as='div' className={className}>
        {children}
      </Box>
    </RadixAccordion.Content>
  ),
);

export default Accordion;
