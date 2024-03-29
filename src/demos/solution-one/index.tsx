import GroupeAsTabs from '@/components/groups-as-tabs/group-as-tabs';
import Slice from '@/components/slice';
import Demo from '@/components/demo-wrapper';
import Field from '@/components/field';
import List from '@/components/primitives/list';
import styles from './styles.module.css';
import { Fragment } from 'react/jsx-runtime';
import Testimonial from '@/slices/testimonial';

function SolutionOne() {
  return (
    <Fragment>
      <Demo type='slice'>
        <Testimonial />
      </Demo>
      <Demo>
        <Slice label={mocks.name}>
          <List
            className={styles.list}
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
          <GroupeAsTabs items={mocks.repeatables} />
        </Slice>
      </Demo>
    </Fragment>
  );
}

export default SolutionOne;

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
