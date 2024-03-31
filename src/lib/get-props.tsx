type Prop = Record<string, string>;

type Props = Record<string, Array<Prop>>;

interface Slice {
  [key: string]: {
    id: string;
    props: Props;
  };
}

export function getSlices(normalized: NormalizedField, state: AppState): Slice {
  const slice = normalized.children.reduce((acc: Slice, value: string) => {
    const slice = state.builder[value];
    acc[slice.name] = {
      id: slice.id,
      props: slice.children.reduce((innerAcc: Props, innerValue: string) => {
        const component = state.builder[innerValue];
        const type = component.type;
        const componentName = component.name.toLocaleLowerCase();

        if (type === 'array') {
          innerAcc[componentName] = component.children.map((child) => {
            return state.builder[child].children.reduce((childAcc: Prop, c) => {
              const item = state.builder[c];
              childAcc[item.name.toLocaleLowerCase()] = item.props[item.name];
              return childAcc;
            }, {});
          });
        } else {
          innerAcc[componentName] = component.props[component.name];
        }

        return innerAcc;
      }, {}),
    };
    return acc;
  }, {});

  return {
    ...slice,
  };
}

export function getFields(ids: Array<string>, state: AppState) {
  return ids.map((field) => {
    return {
      ...state.builder[field],
    };
  });
}
