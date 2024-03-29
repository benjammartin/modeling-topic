import React from 'react';
import Box from './box';

const CARD_NAME = 'Card';

const CARD: React.ElementType = 'article';
type CardElement = React.ElementRef<typeof CARD>;
type NativeCardProps = React.ComponentPropsWithoutRef<typeof CARD>;

interface CardProps extends NativeCardProps {}

const Card = React.forwardRef<CardElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} as='article' className={className} {...props}>
        {children}
      </Box>
    );
  },
);

Card.displayName = CARD_NAME;

const PreviewComponent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className, ...props }) => {
  return (
    <Box as='div' className={className} {...props}>
      {children}
    </Box>
  );
};

const MetasComponent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className, ...props }) => {
  return (
    <Box as='div' className={className} {...props}>
      {children}
    </Box>
  );
};

const Root = Card;
const Preview = PreviewComponent;
const Metas = MetasComponent;

export { Root, Card, Preview, MetasComponent, Metas };
