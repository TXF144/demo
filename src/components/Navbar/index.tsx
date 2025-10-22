// components/Navbar/index.tsx
import React from 'react';

import { Logo } from './logo';
import NavLinks from './navLinks';
// import { ActionButtons } from './ActionButtons';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white py-3 px-4 sticky top-0 z-50">
      {/* 容器：限制宽度并居中内容 */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <NavLinks />
        {/* <ActionButtons /> */}
      </div>
    </nav>
  );
};
