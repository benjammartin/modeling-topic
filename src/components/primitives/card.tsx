import Box from './box';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Box as='article' className={className} {...props}>
      {children}
    </Box>
  );
};

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
