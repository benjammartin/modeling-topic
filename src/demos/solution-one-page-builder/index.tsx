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
import GroupeAsTabs from '@/components/groups-as-tabs/group-as-tabs';

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
    const display = state.builder[slice].display;
    const ids = state.builder[slice].children;
    const fields = getFields(ids, state);
    if (display === 'collapsible') {
      return (
        <Slice key={slice} id={slice} label={slice}>
          <List
            items={fields}
            renderItem={(props, _) => {
              if (props.type === 'array') {
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
    }
    if (display === 'default') {
      return (
        <Slice key={slice} id={slice} label={slice}>
          <List
            items={fields}
            renderItem={(props, _) => {
              if (props.type === 'array') {
                return (
                  <GroupWrapper label={props.name}>
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
    }
    if (display === 'tabs') {
      const tabs = fields.reduce((acc: Array<NormalizedField>, field) => {
        if (field.type === 'array') {
          acc.push(field);
        }
        return acc;
      }, []);

      return (
        <Slice key={slice} id={slice} label={slice}>
          <List
            items={fields}
            renderItem={(props, _) => {
              return (
                <Field
                  id={props.id}
                  key={props.id}
                  type={props.type}
                  value={'xx'}
                  name={props.name}
                />
              );
            }}
          />
          <GroupeAsTabs items={tabs} />
        </Slice>
      );
    }
  });
};
