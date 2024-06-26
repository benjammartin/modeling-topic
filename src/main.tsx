import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './reset.css';
import AppContextProvider from './contexts/app-provider.tsx';
import SolutionOneTabsPageBuilder from './demos/solution-one-tabs/index.tsx';
import SolutionThreePageBuilder from './demos/solution-three-collaps-group/index.tsx';
import SolutionTwoPageBuilder from './demos/solution-two/index.tsx';
import Preview from './demos/preview/index.tsx';

const router = createBrowserRouter([
  {
    path: '/preview',
    element: (
      <AppContextProvider>
        <Preview />
      </AppContextProvider>
    ),
  },
  {
    path: '/solution-one',
    element: (
      <AppContextProvider>
        <SolutionOneTabsPageBuilder />
      </AppContextProvider>
    ),
  },
  {
    path: '/solution-three',
    element: (
      <AppContextProvider>
        <SolutionThreePageBuilder />
      </AppContextProvider>
    ),
  },
  {
    path: '/solution-two',
    element: (
      <AppContextProvider>
        <SolutionTwoPageBuilder />
      </AppContextProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
