export function getProps(normalized: NormalizedField, state: AppState) {
  const props = normalized.children.reduce((acc: any, value: string) => {
    const slice = state.builder[value];
    acc[slice.name] = slice.children.reduce((acc: any, value: string) => {
      const component = state.builder[value];
      const type = component.type;
      switch (type) {
        case 'array':
          return (
            (acc[component.name.toLocaleLowerCase()] = component.children.map(
              (child) => {
                return state.builder[child].children.reduce((acc, c) => {
                  const item = state.builder[c];
                  return (acc[item.name] = item.props[item.name]);
                }, {});
              },
            )),
            acc
          );
        default:
          return (
            (acc[component.name.toLocaleLowerCase()] =
              component.props[component.name]),
            acc
          );
      }
    }, {});

    return acc;
  }, {});
  return props;
}

export function getFields(ids: Array<string>, state: AppState) {
  return ids.map((field) => {
    return {
      ...state.builder[field],
    };
  });
}
