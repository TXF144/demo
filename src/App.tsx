import './App.css';
import { Outlet } from 'react-router-dom'; // 路由出口（显示匹配的页面）

import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="app-container">
      {/* 全局导航栏（所有页面共享） */}
      <Navbar />

      {/* 路由出口：当前匹配的页面组件会在这里渲染 */}
      <main className="app-content">
        <Outlet />
      </main>

      {/* 全局页脚（所有页面共享） */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
