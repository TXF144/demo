// components/Navbar/Logo.tsx
import React from 'react';

import Icon from '../../Icon';
// 必须添加 ?react 后缀，强制插件将 SVG 转为 React 组件
// import MapleLeaf from '@/assets/icons/maple-leaf.svg?react'; // 确保路径正确

export const Logo: React.FC = () => {
  return (
    <a href="/" className="mr-8">
      {/* <img src={mapleLeaf} alt="Apple" className="h-8 w-auto" /> */}
      {/* <MapleLeaf className="h-8 w-auto" /> */}
      <Icon name="maple-leaf" className="h-8 w-auto" />
    </a>
  );
};
