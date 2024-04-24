import { useCurrentAppContext } from '@/contexts/app-provider';
import Groups from '@/components/accordion';
import React from 'react';
import GroupWrapper from '../group-wrapper';

interface GroupsV2Props {
  item: NormalizedField;
  name: string;
  id: string;
}

const GroupsV2: React.FC<GroupsV2Props> = (props) => {
  const { state } = useCurrentAppContext();
  const ids = state.builder[props.item.id].children;

  return (
    <GroupWrapper label={props.item.name} number={ids.length.toString()}>
      <Groups id={props.item.id} name={props.item.name} items={ids} />
    </GroupWrapper>
  );
};

export default GroupsV2;

/** <Accordion id={item.id} items={item.children} name={item.name} /> */

//** */
