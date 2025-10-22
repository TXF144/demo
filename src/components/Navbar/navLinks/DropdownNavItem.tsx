import React, { useState } from 'react';

import BaseNavItem from './BaseNavItem';

import type { NavItem } from '../config/navConfig';

// 下拉菜单导航项（扩展基础组件，支持子菜单）
interface DropdownNavItemProps {
  item: NavItem;
  depth?: number;
}

const DropdownNavItem: React.FC<DropdownNavItemProps> = ({ item, depth = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!item.children?.length) {
    // 没有子菜单时降级为基础导航项
    return <BaseNavItem item={item} depth={depth} />;
  }

  return (
    <div
      className="nav-dropdown"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* 父项 */}
      <BaseNavItem item={item} depth={depth} />

      {/* 子菜单 */}
      {expanded && (
        <div className="nav-dropdown-menu">
          {item.children.map((child: { key: any }) => (
            <BaseNavItem key={child.key} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownNavItem;
