import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './reset.css';
import SolutionOnePageBuilder from './demos/solution-one-page-builder/index.tsx';
import AppContextProvider from './contexts/app-provider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppContextProvider>
        <SolutionOnePageBuilder />
      </AppContextProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
