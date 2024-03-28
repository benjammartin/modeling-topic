import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './reset.css';
import SolutionOne from './demos/solution-one/index.tsx';
import SolutionTwo from './demos/solution-two/index.tsx';
import SolutionOnePageBuilder from './demos/solution-one-page-builder/index.tsx';
import Hereo from './slices/hereo.tsx';

const router = createBrowserRouter([
  {
    path: '/slice',
    element: Hereo(),
  },
  {
    path: '/',
    element: <SolutionOnePageBuilder />,
  },
  {
    path: '/solution-one',
    element: SolutionOne(),
  },
  {
    path: '/solution-two',
    element: SolutionTwo(),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
