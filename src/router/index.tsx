import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/HomePage';

// 1. 定义路由规则
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/pagehome" replace />,
  },
  {
    path: '/pagehome',
    element: <App />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;
