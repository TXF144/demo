import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom'; // 路由提供者

import router from './router'; // 导入上面定义的路由配置
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 传入路由配置，让整个应用拥有路由能力 */}
    <RouterProvider router={router} />
  </StrictMode>,
);
