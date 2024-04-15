import * as Layout from '@/components/layout/layout';
import Slice from '@/components/slice';
import List from '@/components/primitives/list';
import Field from '@/components/field';
import Navigation from '@/components/navigation';
import Groups from '@/components/accordion';
import TableSlice from '@/components/table-slices';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getFields } from '@/lib/get-props';
import GroupWrapperCollapsed from '@/components/group-wrapper-collapsed';
import { Fragment } from 'react/jsx-runtime';

const SolutionThreePageBuilder = () => {
  return (
    <Fragment>
      <Navigation />
      <Layout.Root>
        <Layout.Sidebar>xxx</Layout.Sidebar>
        <Layout.Main>
          <Editor />
        </Layout.Main>
      </Layout.Root>
    </Fragment>
  );
};

export default SolutionThreePageBuilder;

const Editor = () => {
  const main = 'root';
  const { state } = useCurrentAppContext();
  return state.builder[main].children.map((slice) => {
    const ids = state.builder[slice].children;
    const fields = getFields(ids, state);
    return (
      <Slice key={slice} id={slice} label='TOTO'>
        <List
          items={fields}
          renderItem={(props, _) => {
            if (props.type === 'array') {
              return (
                <GroupWrapperCollapsed label={props.name} key={props.id}>
                  <Groups
                    id={props.id}
                    name={props.name}
                    key={_}
                    items={props.children}
                  />
                </GroupWrapperCollapsed>
              );
            } else {
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

/**<List
          items={fields}
          renderItem={(props, _) => {
            if (props.type === 'array') {
              return (
                <GroupWrapperCollapsed label={props.name} key={props.id}>
                  <Groups
                    id={props.id}
                    name={props.name}
                    key={_}
                    items={props.children}
                  />
                </GroupWrapperCollapsed>
              );
            } else {
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
        /> */
