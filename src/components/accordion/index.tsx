import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import * as RadixAccordion from '@radix-ui/react-accordion';
import styles from './styles.module.css';
import React, { Fragment, useEffect, useRef } from 'react';
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
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import GroupWrapper from '../group-wrapper';
import Groups from '@/components/accordion';
import TooltipDemo from '../tooltip';

const Accordion: React.FC<{
  items: Array<string>;
  id: string;
  name: string;
}> = ({ items, id, name }) => {
  const [prime] = items;
  const [defaultValue, setDefaultValue] = React.useState<string>(prime);
  const [editable, setEditable] = React.useState(false);

  const { state, dispatch } = useCurrentAppContext();
  const makeItEditable: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditable(true);
  };

  useEffect(() => {
    setDefaultValue(items[items.length - 1]);
  }, [items]);

  const [parent, elements, _setValues] = useDragAndDrop<
    HTMLUListElement,
    string
  >(items, {
    plugins: [animations()],
  });

  useEffect(() => {
    _setValues(items);
  }, [items, _setValues]);

  useEffect(() => {
    dispatch({
      type: 'REORDER',
      payload: {
        items: elements,
        id: id,
      },
    });
  }, [elements, dispatch, id]);

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
        <Box ref={parent}>
          {elements.length &&
            elements.map((item, i) => {
              const data = state.builder[item];
              const ids = state.builder[item]?.children;
              const fields = getFields(ids, state);
              return (
                <AccordionItem
                  className={styles.item}
                  key={item}
                  value={item}
                  data-label={item}
                >
                  <AccordionTrigger className={styles.trigger}>
                    <Box>
                      <Box as='span'>
                        <Chevron className={styles.chevron} />
                        <Item />
                        <TooltipDemo label='Double click to rename'>
                          <Box
                            className={styles.itemName}
                            as='p'
                            contentEditable={editable}
                            onDoubleClick={makeItEditable}
                            onBlur={() => setEditable(false)}
                          >
                            {data.name}
                          </Box>
                        </TooltipDemo>
                        • {i + 1}
                      </Box>
                      <Box className={styles.actions}>
                        <Box className={styles.move}>
                          <ButtonIcon type='outline' direction='left'>
                            <Movedown />
                          </ButtonIcon>
                          <ButtonIcon type='outline' direction='right'>
                            <Moveup />
                          </ButtonIcon>
                        </Box>
                        <ButtonIcon type='outline'>
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
                          case 'array':
                            return (
                              <GroupWrapper
                                label={item.name}
                                number={ids.length.toString()}
                                key={item.id}
                              >
                                <Groups
                                  id={item.id}
                                  name={item.name}
                                  items={item.children}
                                />
                              </GroupWrapper>
                            );
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
            })}
        </Box>
      </RadixAccordion.Root>
      <Box as='footer' className={styles.footer}>
        <Button onClick={onAddNewItem}>
          Add new {name.toLocaleLowerCase()}
        </Button>
      </Box>
    </Fragment>
  );
};

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className: string; value: string }
>(
  (
    { children, className, value, ...props },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <RadixAccordion.Item
        ref={ref}
        value={value}
        {...props}
        className={className}
      >
        {children}
      </RadixAccordion.Item>
    );
  },
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
  ({ children, ...props }, forwardedRef: React.Ref<HTMLDivElement>) => (
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
