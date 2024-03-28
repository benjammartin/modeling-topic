import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import * as Accordion from '@radix-ui/react-accordion';
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

const Groups: React.FC<{
  items: Array<SolutionOneGroupItem>;
  label: string;
}> = ({ items, label }) => {
  const [prime] = items;
  return (
    <Fragment>
      <Accordion.Root
        type='single'
        defaultValue={prime.id}
        collapsible
        className={styles.root}
        orientation='vertical'
      >
        <List
          items={items}
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
      </Accordion.Root>
      <Box as='footer' className={styles.footer}>
        <Button>Add new {label.toLocaleLowerCase()}</Button>
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
    <Accordion.Item
      className={className}
      ref={forwardedRef}
      value={value}
      {...props}
    >
      {children}
    </Accordion.Item>
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
    <Accordion.Header className={styles.header}>
      <Accordion.Trigger className={className} ref={forwardedRef} {...props}>
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
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
    <Accordion.Content ref={forwardedRef} {...props}>
      <Box as='div' className={className}>
        {children}
      </Box>
    </Accordion.Content>
  ),
);

export default Groups;
