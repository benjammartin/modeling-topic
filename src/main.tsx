import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './reset.css';
import SolutionOne from './demos/solution-one/index.tsx';
import SolutionTwo from './demos/solution-two/index.tsx';
import SolutionOnePageBuilder from './demos/solution-one-page-builder/index.tsx';

const router = createBrowserRouter([
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
  <React.Fragment>
    <RouterProvider router={router} />
  </React.Fragment>,
);
