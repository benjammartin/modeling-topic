import * as Layout from '@/components/layout/layout';
import Slice from '@/components/slice';
import List from '@/components/primitives/list';
import Tabs from '@/components/groups-as-tabs/group-as-tabs';
import Field from '@/components/field';
import Navigation from '@/components/navigation';
import { Fragment } from 'react/jsx-runtime';
import TableSlice from '@/components/table-slices';

const SolutionOnePageBuilder = () => {
  return (
    <Fragment>
      <Navigation />
      <Layout.Root>
        <Layout.Sidebar>
          <TableSlice />
        </Layout.Sidebar>
        <Layout.Main>
          <Slice label={mocks.name}>
            <List
              items={mocks.fields}
              renderItem={(props, key) => {
                return (
                  <Field
                    key={key}
                    type={props.type}
                    value={props.value}
                    name={props.name}
                  />
                );
              }}
            />
            <Tabs items={mocks.repeatables} />
          </Slice>
          <Slice label={mocks.name}>
            <List
              items={mocks.fields}
              renderItem={(props, key) => {
                return (
                  <Field
                    key={key}
                    type={props.type}
                    value={props.value}
                    name={props.name}
                  />
                );
              }}
            />
            <Tabs items={mocks.repeatables} />
          </Slice>
          <Slice label={mocks.name}>
            <List
              items={mocks.fields}
              renderItem={(props, key) => {
                return (
                  <Field
                    key={key}
                    type={props.type}
                    value={props.value}
                    name={props.name}
                  />
                );
              }}
            />
            <Tabs items={mocks.repeatables} />
          </Slice>
        </Layout.Main>
      </Layout.Root>
    </Fragment>
  );
};

export default SolutionOnePageBuilder;

const mocks: SolutionOneSlice = {
  id: '0',
  name: 'Slice',
  type: 'slice',
  fields: [
    { id: '0', type: 'headingOne', name: 'Heading', value: 'Headline' },
    {
      id: '1',
      type: 'text',
      name: 'Subheading',
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ],
  repeatables: [
    {
      id: '1',
      type: 'repeatable',
      name: 'Button',
      items: [
        {
          id: '0',
          type: 'group-item',
          fields: [
            { id: '0', type: 'text', name: 'Label', value: 'Start now' },
            { id: '1', type: 'text', name: 'Kind', value: 'Primary' },
          ],
        },
        {
          id: '1',
          type: 'group-item',
          fields: [
            { id: '0', type: 'text', name: 'Label', value: 'Demo' },
            { id: '1', type: 'text', name: 'Kind', value: 'Secondary' },
          ],
        },
      ],
    },
    {
      id: '0',
      type: 'repeatable',
      name: 'Card',
      items: [
        {
          id: '0',
          type: 'group-item',
          fields: [
            { id: '0', type: 'headingTwo', name: 'Title', value: 'Card title' },
            {
              id: '1',
              type: 'text',
              name: 'Description',
              value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
          ],
        },
        {
          id: '1',
          type: 'group-item',
          fields: [
            { id: '0', type: 'headingTwo', name: 'Title', value: 'Card title' },
            {
              id: '1',
              type: 'text',
              name: 'Description',
              value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
          ],
        },
        {
          id: '2',
          type: 'group-item',
          fields: [
            { id: '0', type: 'headingTwo', name: 'Title', value: 'Card title' },
            {
              id: '1',
              type: 'text',
              name: 'Description',
              value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
          ],
        },
      ],
    },
  ],
};
