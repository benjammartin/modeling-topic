import React, { FC, useContext, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './styles.module.css';

//@ts-ignore
import useKeypress from 'react-use-keypress';
import { useCurrentAppContext } from '@/contexts/app-provider';
import Box from '../primitives/box';
import { useOnClickOutside } from 'usehooks-ts';

function getValue(item: Record<string, string>) {
  return Object.values(item).toString();
}

const Search: FC = () => {
  const [URLStructure, setURLStructure] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const { state } = useCurrentAppContext();
  const [openModal, setOpenModal] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpenModal(false));

  useKeypress(['f'], () => {
    setOpenModal(true);
  });

  useKeypress(['Escape'], () => {
    setOpenModal(false);
  });
  const items = Object.keys(state.builder).reduce(
    (
      acc: Array<{
        id: string;
        value: string;
        parentId: string;
        name: string;
        sliceId: string;
      }>,
      key,
    ) => {
      if (key.match('text-')) {
        acc.push({
          id: key,
          name: state.builder[key].name,
          value: getValue(state.builder[key].props),
          parentId: state.builder[key].parentId,
          sliceId: state.builder[key].sliceId,
        });
      }
      return acc;
    },
    [],
  );

  return (
    <Dialog.Root open={openModal}>
      <Dialog.Trigger asChild>
        <button onClick={() => setOpenModal(!openModal)}>search</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content ref={ref} className={styles.content}>
          <CommandContext.Provider
            value={{
              setURLStructure,
              URLStructure,
              search,
              setSearch,
              openModal,
              setOpenModal,
            }}
          >
            <CommandInput />
            <CommandList items={items} />
            <CommandFooter>
              <SelectIcon />
              <span>For navigation</span>

              <OpenIcon />
              <span>For inserting a value</span>
            </CommandFooter>
          </CommandContext.Provider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const CommandInput: FC = () => {
  const { search, setSearch } = useContext(CommandContext);
  return (
    <div className={styles.commandSearch}>
      <input
        className={styles.commandInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
        type='text'
        placeholder='Search...'
      />
    </div>
  );
};

const CommandListItem: FC<{
  children: React.ReactNode;
  id: string;
  isSelected: boolean;
}> = ({ children, id, isSelected }) => {
  return (
    <div
      role='options'
      id={id}
      className={styles.commandListItem}
      aria-selected={isSelected ? true : false}
      data-selected={isSelected}
    >
      {children}
      <div className={styles.commandListItemSC}>
        <EnterKeyIcon />
      </div>
    </div>
  );
};

const CommandList: FC<{
  items: Array<{
    id: string;
    value: string;
    parentId: string;
    name: string;
    sliceId: string;
  }>;
}> = (props) => {
  const [selected, setSelected] = React.useState(0);
  const { dispatch } = useCurrentAppContext();
  const { search, setSearch, setOpenModal } = useContext(CommandContext);

  const filteredItems = props.items
    .filter((item) => item.value.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 6);

  React.useEffect(() => {
    if (filteredItems.length === 0) {
      selectElement(0);
    }
  }, [filteredItems]);

  const selectElement = (index: number) => {
    setSelected(index);
  };

  useKeypress('ArrowDown', () => {
    const nextIndex = (selected + 1) % filteredItems.length;
    selectElement(nextIndex);
  });

  useKeypress('ArrowUp', () => {
    const nextIndex =
      (selected - 1 + filteredItems.length) % filteredItems.length;
    selectElement(nextIndex);
  });

  useKeypress('Enter', () => {
    setSearch('');
    dispatch({
      type: 'SEARCH_FIELD',
      payload: {
        field: filteredItems[selected].id,
        slice: filteredItems[selected].sliceId,
      },
    });
    setOpenModal(false);
  });

  if (search.length) {
    return (
      <Box as='div' className={styles.commandList}>
        {filteredItems.map((p, id: number) => {
          const isSelected = selected === id;
          return (
            <CommandListItem
              isSelected={isSelected}
              id={`${p.id} - ${id}`}
              key={id}
            >
              <div className={styles.commandListItemContent}>{p.value}</div>
            </CommandListItem>
          );
        })}
        {filteredItems.length === 0 && (
          <Box className={styles.commandListEmpty}>No results found</Box>
        )}
      </Box>
    );
  }
};

const CommandFooter: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};

const EnterKeyIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.5 6.5H13V7.5H16V13C16 13.8284 15.3284 14.5 14.5 14.5H9.5V12.5L6 15L9.5 17.5V15.5H14.5C15.8807 15.5 17 14.3807 17 13V7V6.5H16.5Z'
        fill='currentColor'
      />
    </svg>
  );
};

const SelectIcon = () => {
  return (
    <svg role='graphics-symbol' viewBox='0 0 16 16' width='12' height='12'>
      <path
        fill='currentColor'
        d='M4.11 2.385a.61.61 0 01.48-.211c.191 0 .353.07.486.21L8.03 5.409a.66.66 0 01.2.475c0 .191-.061.347-.182.469a.627.627 0 01-.463.181.59.59 0 01-.451-.187L5.926 5.098l-.72-.844.04 1.219v7.242a.624.624 0 01-.187.469.624.624 0 01-.47.187.636.636 0 01-.468-.187.635.635 0 01-.182-.47V5.474l.041-1.22-.726.845-1.201 1.248a.61.61 0 01-.457.187.627.627 0 01-.463-.181.634.634 0 01-.182-.47.66.66 0 01.2-.474l2.958-3.023zm7.786 10.781a.636.636 0 01-.486.205.665.665 0 01-.486-.205l-2.947-3.035a.64.64 0 01-.206-.475c0-.191.061-.345.182-.463a.634.634 0 01.469-.181c.18 0 .33.06.451.181l1.201 1.248.727.85-.041-1.219V2.824c0-.187.06-.342.181-.463a.636.636 0 01.47-.187.627.627 0 01.65.65v7.248l-.041 1.219.726-.85 1.207-1.248a.6.6 0 01.451-.181c.188 0 .342.06.463.181a.615.615 0 01.182.463.648.648 0 01-.2.475l-2.953 3.035z'
      ></path>
    </svg>
  );
};

const OpenIcon = () => {
  return (
    <svg role='graphics-symbol' viewBox='0 0 16 16' width='12' height='12'>
      <path
        fill='currentColor'
        d='M5.38965 14.1667C5.81812 14.1667 6.10156 13.8767 6.10156 13.468C6.10156 13.2571 6.01587 13.0989 5.89062 12.967L4.18994 11.3125L3.02979 10.3369L4.55908 10.4028H12.7922C14.4402 10.4028 15.1389 9.65796 15.1389 8.04297V4.13403C15.1389 2.48608 14.4402 1.78735 12.7922 1.78735H9.13379C8.70532 1.78735 8.4021 2.11035 8.4021 2.50586C8.4021 2.90137 8.69873 3.22437 9.13379 3.22437H12.7593C13.4316 3.22437 13.7151 3.50781 13.7151 4.17358V7.99683C13.7151 8.67578 13.425 8.95923 12.7593 8.95923H4.55908L3.02979 9.03174L4.18994 8.04956L5.89062 6.39502C6.01587 6.26978 6.10156 6.11157 6.10156 5.89404C6.10156 5.48535 5.81812 5.19531 5.38965 5.19531C5.21167 5.19531 5.01392 5.27441 4.8689 5.41943L1.08521 9.1438C0.933594 9.28882 0.854492 9.48657 0.854492 9.68433C0.854492 9.87549 0.933594 10.0732 1.08521 10.2183L4.8689 13.9492C5.01392 14.0876 5.21167 14.1667 5.38965 14.1667Z'
      ></path>
    </svg>
  );
};

const CommandContext = React.createContext<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  URLStructure: string[];
  setURLStructure: React.Dispatch<React.SetStateAction<string[]>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setURLStructure: () => {},
  URLStructure: [],
  search: '',
  setSearch: () => {},
  openModal: false,
  setOpenModal: () => {},
});

export default Search;
