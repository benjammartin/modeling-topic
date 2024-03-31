import * as Layout from '@/components/layout/layout';
import Slice from '@/components/slice';
import List from '@/components/primitives/list';
import Field from '@/components/field';
import Navigation from '@/components/navigation';
import Groups from '@/components/accordion';
import TableSlice from '@/components/table-slices';
import AppContextProvider, {
  useCurrentAppContext,
} from '@/contexts/app-provider';
import GroupWrapper from '@/components/group-wrapper';
import { getFields, getProps } from '@/lib/get-props';
import GroupWrapperCollapsed from '@/components/group-wrapper-collapsed';

const SolutionOnePageBuilder = () => {
  return (
    <AppContextProvider>
      <Navigation />
      <Layout.Root>
        <Layout.Sidebar>
          <TableSlice />
        </Layout.Sidebar>
        <Layout.Main>
          <Editor />
        </Layout.Main>
      </Layout.Root>
    </AppContextProvider>
  );
};

export default SolutionOnePageBuilder;

const Editor = () => {
  const main = 'root';
  const { state } = useCurrentAppContext();
  return state.builder[main].children.map((slice) => {
    const ids = state.builder[slice].children;
    const fields = getFields(ids, state);

    return (
      <Slice key={slice} id={slice} label={slice}>
        <List
          items={fields}
          renderItem={(props, _) => {
            switch (props.type) {
              case 'array':
                return (
                  <GroupWrapperCollapsed label={props.name}>
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
