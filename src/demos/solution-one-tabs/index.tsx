import * as Layout from '@/components/layout/layout';
import Slice from '@/components/slice';
import List from '@/components/primitives/list';
import Field from '@/components/field';
import Navigation from '@/components/navigation';
import TableSlice from '@/components/table-slices';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getFields } from '@/lib/get-props';
import GroupeAsTabs from '@/components/groups-as-tabs/group-as-tabs';
import { Fragment } from 'react/jsx-runtime';

const SolutionOneTabsPageBuilder = () => {
  return (
    <Fragment>
      <Navigation />
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
    const tabs = fields.reduce((acc: Array<NormalizedField>, field) => {
      if (field.type === 'array') {
        acc.push(field);
      }
      return acc;
    }, []);
    return (
      <Slice key={slice} id={slice} label={state.builder[slice].name}>
        <List
          items={fields}
          renderItem={(props) => {
            if (props.type != 'array') {
              return (
                <Field
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
        <GroupeAsTabs items={tabs} />
      </Slice>
    );
  });
};
