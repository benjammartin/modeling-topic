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
import React, { useEffect } from 'react';
import GroupWrapper from '../group-wrapper';
import TooltipDemo from '../tooltip';

interface GroupsV2Props {
  item: NormalizedField;
  name: string;
  id: string;
}

const GroupsV2: React.FC<GroupsV2Props> = (props) => {
  const { state, dispatch } = useCurrentAppContext();
  const ids = state.builder[props.item.id].children;
  const [prime] = ids;
  const [defaultValue, setDefaultValue] = React.useState<string>(prime);
  const [editable, setEditable] = React.useState(false);

  const makeItEditable = () => setEditable(!editable);

  useEffect(() => {
    setDefaultValue(ids[ids.length - 1]);
    console.log(ids);
  }, [ids]);

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
    <GroupWrapper label={props.item.name} number={ids.length.toString()}>
      <Groups id={props.item.id} name={props.item.name} items={ids} />
    </GroupWrapper>
  );
};

export default GroupsV2;

/** <Accordion id={item.id} items={item.children} name={item.name} /> */

//** */
