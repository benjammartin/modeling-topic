import * as RadixTabs from '@radix-ui/react-tabs';
import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import styles from './tabs.module.css';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getFields } from '@/lib/get-props';
import Groups from '@/components/accordion';
import GroupWrapperCollapsed from '../group-wrapper-collapsed';
import Field from '../field';
import ButtonIcon from '../button-icon';
import More from '../icons/more';
import Drag from '../icons/drag';
import Add from '../icons/add';
import React, { createRef, useEffect, useRef, useState } from 'react';
import GroupWrapper from '../group-wrapper';
import TooltipDemo from '../tooltip';
import { getPlural } from '@/lib/utils';

interface TabsV2Props {
  item: NormalizedField;
  name: string;
  id: string;
}

const TabsV2: React.FC<TabsV2Props> = (props) => {
  const { state, dispatch } = useCurrentAppContext();
  const ids = state.builder[props.item.id].children;
  const tabs = getFields(ids, state);
  const [prime] = ids;
  const [defaultValue, setDefaultValue] = React.useState<string>(prime);
  const refs = ids.map(() => createRef<HTMLParagraphElement>());
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const initial = useRef(ids.length);

  const handleClick = (index: number) => {
    console.log('handleClick->', index);
    setEditableIndex(index);
  };

  useEffect(() => {
    if (ids.length > initial.current) {
      setEditableIndex(ids.length - 1);
    }
  }, [ids.length - 1]);

  const handleBlur = () => {
    setEditableIndex(null);
  };

  useEffect(() => {
    setDefaultValue(ids[ids.length - 1]);
    console.log(ids);
  }, [ids]);

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

  const onAddNewItem = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        schema: state.builder[props.item.id].schema as Fields,
        id: props.item.id,
      },
    });
  };

  return (
    <GroupWrapper
      label={getPlural(props.item.name)}
      number={ids.length.toString()}
    >
      <RadixTabs.Root
        className={styles.root}
        value={defaultValue}
        onValueChange={(value) => setDefaultValue(value)}
      >
        <RadixTabs.List className={styles.list}>
          <List
            className={styles.triggers}
            items={tabs}
            renderItem={(item, i) => (
              <RadixTabs.Trigger
                value={item.id}
                key={i}
                className={styles.trigger}
                asChild
              >
                <Box as='div'>
                  <Drag />
                  <Box
                    ref={refs[i]}
                    as='p'
                    className={styles.name}
                    contentEditable={editableIndex === i}
                    onClick={() => handleClick(i)}
                    onBlur={handleBlur}
                  >
                    {item.name}
                  </Box>
                  <Box>•</Box>
                  <Box>{i + 1}</Box>

                  <More />
                </Box>
              </RadixTabs.Trigger>
            )}
          />
          <TooltipDemo label={`Add new ${props.item.name}`}>
            <ButtonIcon type='ghost' onClick={onAddNewItem}>
              <Add />
            </ButtonIcon>
          </TooltipDemo>
        </RadixTabs.List>
        <List
          items={tabs}
          renderItem={(item, i) => {
            const ids = state.builder[item.id].children;
            const fields = getFields(ids, state);
            return (
              <RadixTabs.Content
                value={item.id}
                key={i}
                className={styles.content}
              >
                <List
                  items={fields}
                  className={styles.fields}
                  renderItem={(props, _) => {
                    switch (props.type) {
                      case 'array':
                        return (
                          <GroupWrapperCollapsed
                            number={props.children.length.toString()}
                            label={getPlural(props.name)}
                            key={props.id}
                          >
                            <Groups
                              id={props.id}
                              name={props.name}
                              key={_}
                              items={props.children}
                            />
                          </GroupWrapperCollapsed>
                        );
                      default:
                        return (
                          <Field
                            format={props.format}
                            id={props.id}
                            key={props.id}
                            type={props.type}
                            value={'xx'}
                            name={props.name}
                          />
                        );
                    }
                  }}
                />
              </RadixTabs.Content>
            );
          }}
        />
      </RadixTabs.Root>
    </GroupWrapper>
  );
};

export default TabsV2;

/** <Accordion id={item.id} items={item.children} name={item.name} /> */
