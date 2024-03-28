import * as RadixTabs from '@radix-ui/react-tabs';
import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import styles from './tabs.module.css';
import Groups from '@/components/groups';
``;

interface TabsProps {
  items: Array<SolutionOneRepeatable>;
}

const Tabs: React.FC<TabsProps> = ({ items }) => {
  console.log(items);
  const [prime] = items;
  return (
    <RadixTabs.Root className={styles.root} defaultValue={prime.id}>
      <RadixTabs.List>
        <List
          className={styles.list}
          items={items}
          renderItem={(item, i) => (
            <RadixTabs.Trigger
              value={item.id}
              key={i}
              className={styles.trigger}
            >
              <Box as='p'>{item.name + 's'}</Box>
            </RadixTabs.Trigger>
          )}
        />
        <List
          items={items}
          renderItem={(item, i) => (
            <RadixTabs.Content value={item.id} key={i}>
              <Groups items={item.items} label={item.name} />
            </RadixTabs.Content>
          )}
        />
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};

export default Tabs;
