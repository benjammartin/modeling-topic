import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import * as Accordion from '@radix-ui/react-accordion';
import styles from './styles.module.css';
import React from 'react';
import Field from '../field';
import Item from '../icons/item';
import Chevron from '../icons/chevron';

const Groups: React.FC<{ items: Array<{ id: string }> }> = ({ items }) => {
  const [prime] = items;
  return (
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
                <Item /> {`Item - ${item.id}`}
              </Box>
            </AccordionTrigger>
            <AccordionContent className={styles.content}>
              <Field />
              <Field />
              <Field />
            </AccordionContent>
          </AccordionItem>
        )}
      />
    </Accordion.Root>
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
        <Box>Chevron</Box>
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
