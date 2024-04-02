import { getNormalizedItem, getNormalizedSlice } from '@/lib/utils';
import { produce } from 'immer';
import React from 'react';
import hereoconfig from '@/slices/hereo.config.json';
import ctaconfig from '@/slices/cta.config.json';
import featuresconfig from '@/slices/features.config.json';
import testimoniamconfig from '@/slices/testimonial.config.json';
import faqconfig from '@/slices/faq.config.json';
// Represents the payloads for each action type

type UpdateProps = {
  id: string;
  name: string;
  value: string;
};

type ActionPayloads = {
  SELECT_ELEMENT: string;
  UPDATE_PROPS: UpdateProps;
  ADD_ITEM: {
    schema: Fields;
    id: string;
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

const hereo = getNormalizedSlice(hereoconfig);
const calltoaction = getNormalizedSlice(ctaconfig);
const features = getNormalizedSlice(featuresconfig);
const testimonial = getNormalizedSlice(testimoniamconfig);
const FAQ = getNormalizedSlice(faqconfig);
const INITIAL_STATE: AppState = {
  selected: hereo.sliceKey,
  builder: {
    root: {
      id: 'root',
      type: 'page',
      name: 'root',
      props: {},
      children: [
        hereo.sliceKey,
        testimonial.sliceKey,
        features.sliceKey,
        calltoaction.sliceKey,
        FAQ.sliceKey,
      ],
    },
    ...hereo.slice,
    ...hereo.fields,
    ...calltoaction.slice,
    ...calltoaction.fields,
    ...features.slice,
    ...features.fields,
    ...testimonial.slice,
    ...testimonial.fields,
    ...FAQ.slice,
    ...FAQ.fields,
  },
  anchors: {
    [hereo.sliceKey]: React.createRef(),
    [features.sliceKey]: React.createRef(),
    [calltoaction.sliceKey]: React.createRef(),
    [testimonial.sliceKey]: React.createRef(),
    [FAQ.sliceKey]: React.createRef(),
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

// Reducer function to handle state changes
const reducer = produce((draft: AppState, action: AvailableAction) => {
  switch (action.type) {
    case 'SELECT_ELEMENT': {
      draft.selected = action.payload;
      break;
    }
    case 'UPDATE_PROPS': {
      draft.builder[action.payload.id].props[action.payload.name] =
        action.payload.value;
      break;
    }
    case 'ADD_ITEM': {
      const items = getNormalizedItem(action.payload.schema);
      draft.builder[action.payload.id].children.push(items.itemKey);
      draft.builder = { ...draft.builder, ...items.item, ...items.fields };
      break;
    }
  }
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
