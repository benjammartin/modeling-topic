import * as RadixTabs from '@radix-ui/react-tabs';
import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import styles from './tabs.module.css';
import Field from '@/components/field';
import Groups from '@/components/groups';

const mock = [
  {
    id: '0',
    title: 'Group 1',
    content: 'Content 1',
    items: [{ id: '0' }, { id: '1' }],
  },
  {
    id: '1',
    title: 'Group 2',
    content: 'Content 2',
    items: [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }],
  },
  {
    id: '2',
    title: 'Group 3',
    content: 'Content 3',
    items: [{ id: '0' }],
  },
];

const Tabs = () => {
  const [prime] = mock;
  return (
    <RadixTabs.Root className={styles.root} defaultValue={prime.id}>
      <RadixTabs.List>
        <List
          className={styles.list}
          items={mock}
          renderItem={(item, i) => (
            <RadixTabs.Trigger
              value={item.id}
              key={i}
              className={styles.trigger}
            >
              <Box as='p'>{item.title}</Box>
            </RadixTabs.Trigger>
          )}
        />
      </RadixTabs.List>
      <List
        items={mock}
        renderItem={(item, i) => (
          <RadixTabs.Content value={item.id} key={i}>
            <Groups items={item.items} />
          </RadixTabs.Content>
        )}
      />
    </RadixTabs.Root>
  );
};

export default Tabs;
