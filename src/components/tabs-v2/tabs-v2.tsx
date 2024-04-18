import * as RadixTabs from '@radix-ui/react-tabs';
import List from '@/components/primitives/list';
import Box from '@/components/primitives/box';
import styles from './tabs.module.css';
import { useCurrentAppContext } from '@/contexts/app-provider';
import { getFields } from '@/lib/get-props';
import Groups from '@/components/accordion';
import GroupWrapperCollapsed from '../group-wrapper-collapsed';
import Field from '../field';
import ButtonIcon from '../button-icon';
import More from '../icons/more';
import Drag from '../icons/drag';
import Add from '../icons/add';

interface TabsV2Props {
  item: NormalizedField;
  name: string;
  id: string;
}

const TabsV2: React.FC<TabsV2Props> = (props) => {
  const { state, dispatch } = useCurrentAppContext();
  const ids = state.builder[props.item.id].children;
  const tabs = getFields(ids, state);
  const [prime] = tabs;

  const onAddNewItem = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        schema: state.builder[props.item.id].schema as Fields,
        id: props.item.id,
      },
    });
  };

  return (
    <GroupWrapperCollapsed label={props.item.name}>
      <RadixTabs.Root className={styles.root} defaultValue={prime.id}>
        <RadixTabs.List className={styles.list}>
          <List
            className={styles.triggers}
            items={tabs}
            renderItem={(item, i) => (
              <RadixTabs.Trigger
                value={item.id}
                key={i}
                className={styles.trigger}
                asChild
              >
                <Box as='div'>
                  <Drag />
                  <Box as='p' contentEditable>
                    {props.name} {i + 1}{' '}
                  </Box>
                  <More />
                </Box>
              </RadixTabs.Trigger>
            )}
          />
          <ButtonIcon type='ghost' onClick={onAddNewItem}>
            <Add />
          </ButtonIcon>
        </RadixTabs.List>
        <List
          items={tabs}
          renderItem={(item, i) => {
            const ids = state.builder[item.id].children;
            const fields = getFields(ids, state);
            return (
              <RadixTabs.Content
                value={item.id}
                key={i}
                className={styles.content}
              >
                <List
                  items={fields}
                  className={styles.fields}
                  renderItem={(props, _) => {
                    switch (props.type) {
                      case 'array':
                        return (
                          <GroupWrapperCollapsed
                            label={props.name}
                            key={props.id}
                          >
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
              </RadixTabs.Content>
            );
          }}
        />
      </RadixTabs.Root>
    </GroupWrapperCollapsed>
  );
};

export default TabsV2;

/** <Accordion id={item.id} items={item.children} name={item.name} /> */