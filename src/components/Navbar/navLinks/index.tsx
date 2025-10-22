import React from 'react';

import DropdownNavItem from './DropdownNavItem';
import navConfig from '../config/navConfig';
import { useNavUtils } from '../config/useNavUtils';

import type { NavItem } from '../config/navConfig';
import './Navbar.scss';

// 导航栏主组件（整合所有功能，支持扩展）
interface NavbarProps {
  // 允许外部传入配置覆盖默认配置
  config?: NavItem[];
  // 用户权限（用于过滤导航项）
  userPermissions?: string[];
}

const NavLinks: React.FC<NavbarProps> = ({ config = navConfig, userPermissions = [] }) => {
  const { filterByPermission } = useNavUtils();
  // 过滤有权限的导航项
  const filteredNavItems = filterByPermission(config, userPermissions);

  // 根据导航项类型选择对应的渲染组件
  const renderNavItem = (item: NavItem, depth: number = 0) => {
    switch (item.type) {
      case 'dropdown':
        return <DropdownNavItem key={item.key} item={item} depth={depth} />;
      default:
        return <DropdownNavItem key={item.key} item={item} depth={depth} />;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/pagehome" className="navbar-logo">
          <i className="fa fa-cube"></i>
        </a>

        {/* 导航菜单 */}
        <ul className="navbar-menu">
          {filteredNavItems.map((item: NavItem) => renderNavItem(item))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
