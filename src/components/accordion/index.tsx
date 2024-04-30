import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import * as RadixAccordion from '@radix-ui/react-accordion';
import styles from './styles.module.css';
import React, {
  Fragment,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import TooltipDemo from '../tooltip';

const Accordion: React.FC<{
  items: Array<string>;
  id: string;
  name: string;
}> = ({ items, id, name }) => {
  const [prime] = items;
  const [defaultValue, setDefaultValue] = React.useState<string>(prime);
  const { state, dispatch } = useCurrentAppContext();
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const initial = useRef(items.length);

  useEffect(() => {
    setDefaultValue(items[items.length - 1]);
  }, [items]);

  useEffect(() => {
    console.log('current ->', editableIndex);
  }, []);

  const refs = items.map(() => createRef<HTMLParagraphElement>());

  useEffect(() => {
    console.log('index->', editableIndex);
    if (editableIndex !== null) {
      refs[editableIndex].current?.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(refs[editableIndex].current!);
      sel!.removeAllRanges();
      sel!.addRange(range);
    }
  }, [editableIndex]);

  const handleClick = (index: number) => {
    console.log('handleClick->', index);
    setEditableIndex(index);
  };

  const handleBlur = () => {
    setEditableIndex(null);
  };

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

  useEffect(() => {
    if (items.length > initial.current) {
      setEditableIndex(items.length - 1);
    }
  }, [items.length - 1]);

  const onAddNewItem = useCallback(() => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        schema: state.builder[id].schema as Fields,
        id: id,
      },
    });
  }, []);

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
                            ref={refs[i]}
                            className={styles.name}
                            contentEditable={editableIndex === i}
                            onClick={() => handleClick(i)}
                            onBlur={handleBlur}
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
