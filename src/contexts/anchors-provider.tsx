import { createContext, createRef, useContext } from 'react';

export const AnchorsContext = createContext<
  Record<string, React.RefObject<HTMLDivElement>>
>({
  hereo: createRef(),
  features: createRef(),
  testimonial: createRef(),
  calltoaction: createRef(),
});

export const useAnchorsContext = () => useContext(AnchorsContext);
