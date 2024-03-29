import Box from '../primitives/box';
import React from 'react';

const Frame: React.FC<{ children: React.ReactNode; scale?: number }> = ({
  scale = 0.134667,
  children,
}) => {
  const SCALE_FACTOR = scale;
  const SLICE_WIDTH = 1600;
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState<number>(500);
  const [resize, setResize] = React.useState<number>(100);
  React.useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight || 500);
    }
  }, [height]);
  React.useEffect(() => {
    setResize(height * SCALE_FACTOR);
  }, [height, SCALE_FACTOR]);
  return (
    <Box
      as='div'
      style={{
        height: resize,
        position: 'relative',
        display: 'flex',
        width: 216,
      }}
    >
      <Box
        as='div'
        ref={ref}
        style={{
          width: SLICE_WIDTH,
          height: height,
          transform: `scale(${SCALE_FACTOR})`,
          position: 'absolute',
          transformOrigin: 'top left',
          border: 'none',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Frame;
