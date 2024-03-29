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
import { getFields } from '@/lib/get-props';

const SolutionOnePageBuilder = () => {
  const { state } = useCurrentAppContext();
  const main = 'root';
  return (
    <AppContextProvider>
      <Navigation />
      <Layout.Root>
        <Layout.Sidebar>
          <TableSlice />
        </Layout.Sidebar>
        <Layout.Main>
          {state.builder[main].children.map((slice) => {
            const ids = state.builder[slice].children;
            const fields = getFields(ids, state);
            return (
              <Slice id={slice} label={slice}>
                <List
                  items={fields}
                  renderItem={(props, _) => {
                    switch (props.type) {
                      case 'array':
                        return (
                          <GroupWrapper label={props.name}>
                            <Groups key={_} items={props.children} />
                          </GroupWrapper>
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
          })}
        </Layout.Main>
      </Layout.Root>
    </AppContextProvider>
  );
};

export default SolutionOnePageBuilder;

/**<Groups
                              key={key}
                              items={props.items}
                              label={props.name}
                            /> */
