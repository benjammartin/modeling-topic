type Prop = Record<string, string>;

type Props = Record<string, Array<Prop> | Prop>;

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
      props: getProps(slice, state),
    };
    return acc;
  }, {});

  return {
    ...slice,
  };
}

function getProps(slice: NormalizedField, state: AppState) {
  return slice.children.reduce((acc: Props, id: string) => {
    const { type, name, props, children } = state.builder[id];
    const prop = name.toLocaleLowerCase();
    switch (type) {
      case 'gallery':
        acc[prop] = children.reduce((childAcc: Array<any>, c) => {
          const item = state.builder[c];
          childAcc.push(item.props);
          return childAcc;
        }, []);
        break;
      case 'array':
        acc[prop] = children.reduce((childAcc: Array<any>, c) => {
          const item = state.builder[c];
          childAcc.push(getProps(item, state));
          return childAcc;
        }, []);
        break;
      default:
        acc[name.toLocaleLowerCase()] = props[name];
        break;
    }
    return acc;
  }, {});
}

export function getFields(ids: Array<string>, state: AppState) {
  return ids.map((field) => {
    return {
      ...state.builder[field],
    };
  });
}
