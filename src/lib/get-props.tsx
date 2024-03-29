type Prop = {
  id: string;
} & ({ content: string; items?: never } | { items: string[]; content?: never });

type Props = {
  [key: string]: Prop;
};

export function getProps(normalized: NormalizedField, state: AppState) {
  const props = normalized.children.reduce((acc: Props, value: string) => {
    const component = state.builder[value];
    if (!component) {
      return acc;
    }
    switch (component.type) {
      case 'array':
        acc[component.name] = {
          id: value,
          items: [],
        };
        break;
      default:
        acc[component.name] = { id: value, content: 'Demo value' };
    }
    return acc;
  }, {});
  return {
    type: normalized.type,
    name: normalized.name,
    ...props,
  };
}

export function getFields(ids: Array<string>, state: AppState) {
  return ids.map((field) => {
    return {
      ...state.builder[field],
    };
  });
}
