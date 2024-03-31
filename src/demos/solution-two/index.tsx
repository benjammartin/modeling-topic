import Slice from '@/components/slice';
import Demo from '@/components/demo-wrapper';
import Field from '@/components/field';
import List from '@/components/primitives/list';
import styles from './styles.module.css';
///import Groups from '@/components/accordion';
import GroupWrapper from '@/components/group-wrapper';

function SolutionTwo() {
  return (
    <Demo>
      <Slice label={mocks.name} id='testimonial'>
        <List
          className={styles.list}
          items={mocks.fields}
          renderItem={(props, key) => {
            switch (props.type) {
              case 'group':
                return <GroupWrapper label={props.name}>WIP</GroupWrapper>;
              default:
                return (
                  <Field
                    key={key}
                    id={props.id}
                    type={props.type}
                    value={props.value}
                    name={props.name}
                  />
                );
            }
          }}
        />
      </Slice>
    </Demo>
  );
}
//**  <Groups key={key} items={props.items} label={props.name} /> */

export default SolutionTwo;

const mocks: SolutionTwoSlice = {
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
    {
      id: '2',
      type: 'group',
      name: 'Button',
      items: [
        {
          id: '0',
          type: 'group-item',
          fields: [
            { id: '0', type: 'text', name: 'Label', value: 'Start now' },
            { id: '0', type: 'text', name: 'Kind', value: 'Primary' },
          ],
        },
        {
          id: '1',
          type: 'group-item',
          fields: [
            { id: '0', type: 'text', name: 'Label', value: 'Demo' },
            { id: '0', type: 'text', name: 'Kind', value: 'Secondary' },
          ],
        },
      ],
    },
    {
      id: '2',
      type: 'group',
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
