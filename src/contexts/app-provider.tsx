import {
  getNormalizedImage,
  getNormalizedItem,
  getNormalizedSlice,
} from '@/lib/utils';
import { produce } from 'immer';
import React from 'react';

//import demo from '@/demo.config.json';
import { configs } from '@/slices/index';
// Represents the payloads for each action type

type UpdateProps = {
  id: string;
  name: string;
  value: string;
};

type ActionPayloads = {
  SELECT_SLICE: string;
  UPDATE_PROPS: UpdateProps;
  SEARCH_FIELD: {
    field: string;
    slice: string;
  };
  ADD_ITEM: {
    schema: Fields;
    id: string;
  };
  ADD_IMAGE: {
    id: string;
    src: string;
  };
  REORDER: {
    id: string;
    items: Array<string>;
  };
};

// Represents the available actions
type AvailableAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

// Represents the context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AvailableAction>;
}

const hereo = getNormalizedSlice(configs.hero);
const cta = getNormalizedSlice(configs.cta);
const feature = getNormalizedSlice(configs.feature);

const INITIAL_STATE: AppState = {
  selected: hereo.sliceKey,
  selectedField: '',
  builder: {
    root: {
      type: 'Root',
      name: 'Root',
      id: 'root',
      children: [hereo.sliceKey, feature.sliceKey, cta.sliceKey],
      props: {},
    },
    ...feature.slice,
    ...feature.fields,
    ...hereo.slice,
    ...hereo.fields,
    ...cta.slice,
    ...cta.fields,
  },
  anchors: {
    [hereo.sliceKey]: React.createRef(),
    [cta.sliceKey]: React.createRef(),
    [feature.sliceKey]: React.createRef(),
  },
};

const AppContext = React.createContext<AppContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

// Hook to use the app context
export const useCurrentAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      'useCurrentAppContext must be used within a component that is wrapped with AppContextProvider',
    );
  }
  return context;
};

export type AppContextProviderProps = {
  children: React.ReactNode;
};

const reducer = produce((draft: AppState, action: AvailableAction) => {
  switch (action.type) {
    case 'SELECT_SLICE': {
      draft.selected = action.payload;
      break;
    }
    case 'UPDATE_PROPS': {
      draft.builder[action.payload.id].props[action.payload.name] =
        action.payload.value;
      break;
    }
    case 'SEARCH_FIELD': {
      const parent =
        draft.builder[draft.builder[action.payload.field].parentId];
      draft.selected = action.payload.slice;
      draft.selectedField = action.payload.field;
      switch (parent.type) {
        case 'group-item':
          const grandParent = draft.builder[parent.parentId];
          console.log(parent.id);
          console.log(action.payload.slice);
          console.log(grandParent.id);
          grandParent.activeItem = parent.id;
          break;
        default:
          break;
      }
      break;
    }
    case 'REORDER': {
      draft.builder[action.payload.id].children = action.payload.items;
      break;
    }
    case 'ADD_ITEM': {
      const items = getNormalizedItem(action.payload.schema, {
        parentId: action.payload.id,
        sliceId: draft.builder[action.payload.id].sliceId,
      });
      draft.builder[action.payload.id].children.push(items.itemKey);
      draft.builder = { ...draft.builder, ...items.item, ...items.fields };
      break;
    }
    case 'ADD_IMAGE': {
      const image = getNormalizedImage(action.payload.id);
      image.props.src = action.payload.src;
      draft.builder[action.payload.id].children.push(image.id);
      draft.builder = { ...draft.builder, [image.id]: image };
      break;
    }
  }
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  console.log(state);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
