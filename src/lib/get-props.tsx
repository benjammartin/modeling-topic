type Field = {
  [key: string]: string | undefined;
};

type Props = {
  [key: string]: string | Field[] | Field | Props;
};

export function getProps(normalized: NormalizedField, state: AppState) {
  return normalized.children.reduce((acc: Props, value: string) => {
    const slice = state.builder[value];
    acc[slice.name] = slice.children.reduce(
      (innerAcc: Props, innerValue: string) => {
        const component = state.builder[innerValue];
        const type = component.type;
        const componentName = component.name.toLocaleLowerCase();

        if (type === 'array') {
          innerAcc[componentName] = component.children.map((child) => {
            return state.builder[child].children.reduce(
              (childAcc: Field, c) => {
                const item = state.builder[c];
                childAcc[item.name.toLocaleLowerCase()] = item.props[item.name];
                return childAcc;
              },
              {},
            );
          });
        } else {
          innerAcc[componentName] = component.props[component.name];
        }

        return innerAcc;
      },
      {},
    );

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
