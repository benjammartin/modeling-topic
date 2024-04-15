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
import { getFields } from '@/lib/get-props';
import { useCurrentAppContext } from '@/contexts/app-provider';
import GalleryImages from '../gallery-images';

const Accordion: React.FC<{
  items: Array<string>;
  id: string;
  name: string;
}> = ({ items, id, name }) => {
  const [defaultValue, setDefaultValue] = React.useState<string>();
  const { state, dispatch } = useCurrentAppContext();

  const onAddNewItem = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        schema: state.builder[id].schema as Fields,
        id: id,
      },
    });
  };

  return (
    <Fragment>
      <RadixAccordion.Root
        type='single'
        value={defaultValue}
        onValueChange={(value) => setDefaultValue(value)}
        collapsible
        className={styles.root}
        orientation='vertical'
      >
        {items.length && (
          <List
            items={items}
            renderItem={(item, i) => {
              const ids = state.builder[item]?.children;
              const fields = getFields(ids, state);
              return (
                <AccordionItem className={styles.item} key={i} value={item}>
                  <AccordionTrigger className={styles.trigger}>
                    <Box>
                      <Box as='span'>
                        <Chevron className={styles.chevron} />
                        <Item /> {name} • {i + 1}
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
                    </Box>
                  </AccordionTrigger>
                  <AccordionContent>
                    <List
                      className={styles.list}
                      items={fields}
                      renderItem={(item, key) => {
                        switch (item.type) {
                          case 'gallery':
                            return (
                              <GalleryImages
                                id={item.id}
                                format={item.format}
                                type={item.type}
                                name={item.name}
                                value={item.id}
                                key={key}
                              />
                            );
                          default:
                            return (
                              <Field
                                id={item.id}
                                format={item.format}
                                type={item.type}
                                name={item.name}
                                value={item.id}
                                key={key}
                              />
                            );
                        }
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            }}
          />
        )}
      </RadixAccordion.Root>
      <Box as='footer' className={styles.footer}>
        <Button onClick={onAddNewItem}>
          Add new {name.toLocaleLowerCase()}
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
  onMouseOver?: React.MouseEventHandler<HTMLHeadingElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLHeadingElement> | undefined;
}> = React.forwardRef(
  (
    { children, className, onMouseOver, onMouseLeave, ...props },
    forwardedRef: React.Ref<HTMLButtonElement>,
  ) => (
    <RadixAccordion.Header
      className={styles.header}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <RadixAccordion.Trigger
        asChild
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
    <RadixAccordion.Content
      ref={forwardedRef}
      {...props}
      className={styles.content}
    >
      <Box as='div' className={styles.innercontent}>
        {children}
      </Box>
    </RadixAccordion.Content>
  ),
);

export default Accordion;
