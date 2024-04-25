import * as Layout from '@/components/layout/layout';
import Slice from '@/components/slice';
import List from '@/components/primitives/list';
import Field from '@/components/field';
import Navigation from '@/components/navigation';
import TableSlice from '@/components/table-slices';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getFields } from '@/lib/get-props';

import { Fragment } from 'react/jsx-runtime';

import GroupsV2 from '@/components/groups-v2/groups-v2';
import Search from '@/components/search';

const SolutionOneTabsPageBuilder = () => {
  return (
    <Fragment>
      <Navigation />
      <Search />
      <Layout.Root>
        <Layout.Sidebar>
          <TableSlice />
        </Layout.Sidebar>
        <Layout.Main>
          <Editor />
        </Layout.Main>
      </Layout.Root>
    </Fragment>
  );
};

export default SolutionOneTabsPageBuilder;

const Editor = () => {
  const main = 'root';
  const { state } = useCurrentAppContext();
  return state.builder[main].children.map((slice) => {
    const ids = state.builder[slice].children;
    const fields = getFields(ids, state);
    return (
      <Slice key={slice} id={slice} label={state.builder[slice].name}>
        <List
          items={fields}
          renderItem={(props) => {
            switch (props.type) {
              case 'array':
                return (
                  <GroupsV2
                    id={props.id}
                    name={props.name}
                    key={props.id}
                    item={props}
                  />
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
      </Slice>
    );
  });
};
