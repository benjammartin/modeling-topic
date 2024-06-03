import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './reset.css';
import AppContextProvider from './contexts/app-provider.tsx';

import SolutionTwoPageBuilder from './demos/solution-two/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
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
