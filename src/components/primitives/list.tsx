import React from 'react';
import Box from './box';

const LIST_NAME = 'List';

const LIST: React.ElementType = 'ul';
type NativeListProps = React.ComponentPropsWithoutRef<typeof LIST>;

interface ListProps<T> extends NativeListProps {
  items: T[];
  renderItem: (item: T, i: number) => React.ReactNode;
  className?: string;
}

const List = <T,>({ items, renderItem, ...props }: ListProps<T>) => {
  return (
    <Box as='ul' {...props}>
      {items.map(renderItem)}
    </Box>
  );
};

List.displayName = LIST_NAME;

export default List;
export type { ListProps };
