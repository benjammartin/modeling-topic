import * as Layout from '@/components/layout/layout';
import Slice from '@/components/slice';
import List from '@/components/primitives/list';
import Field from '@/components/field';
import Navigation from '@/components/navigation';
import Groups from '@/components/accordion';
import TableSlice from '@/components/table-slices';
import { useCurrentAppContext } from '@/contexts/app-provider';
import GroupWrapper from '@/components/group-wrapper';
import { getFields } from '@/lib/get-props';
import { Fragment } from 'react/jsx-runtime';

const SolutionTwoPageBuilder = () => {
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

export default SolutionTwoPageBuilder;

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
          renderItem={(props, _) => {
            if (props.type === 'array') {
              return (
                <GroupWrapper label={props.name} key={props.id}>
                  <Groups
                    id={props.id}
                    name={props.name}
                    key={_}
                    items={props.children}
                  />
                </GroupWrapper>
              );
            } else {
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
      </Slice>
    );
  });
};
