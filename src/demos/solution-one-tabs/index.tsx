import * as Layout from '@/components/layout/layout';
import Slice from '@/components/slice';
import List from '@/components/primitives/list';
import Field from '@/components/field';
import Navigation from '@/components/navigation';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getFields } from '@/lib/get-props';
import { Fragment } from 'react/jsx-runtime';
import TabsV2 from '@/components/tabs-v2/tabs-v2';

const SolutionOneTabsPageBuilder = () => {
  return (
    <Fragment>
      <Navigation />
      <Layout.Root>
        <Layout.Sidebar>TODO</Layout.Sidebar>
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
                return <TabsV2 key={props.id} item={props} />;
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

/**  {tabs.length > 0 && <TabsV2 items={tabs} />} */
