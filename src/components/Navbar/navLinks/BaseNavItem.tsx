import React from 'react';

import { Link } from 'react-router-dom';

import { useNavUtils } from '../config/useNavUtils';

import type { NavItem } from '../config/navConfig';

// 基础导航项（处理通用逻辑：链接、活跃状态、点击事件）
interface BaseNavItemProps {
  item: NavItem;
  depth?: number; // 层级深度（用于样式控制）
}

const BaseNavItem: React.FC<BaseNavItemProps> = ({ item, depth = 0 }) => {
  const { useIsActive, handleNavClick } = useNavUtils();
  const active = useIsActive(item);

  // 优先使用自定义渲染
  if (item.render) {
    return item.render(item);
  }

  // 外部链接使用a标签，内部路由使用Link
  const LinkComponent = item.type === 'external' ? 'a' : Link;

  return (
    <LinkComponent
      to={item.type !== 'external' ? item.path : ''}
      href={item.type === 'external' ? item.path : undefined}
      className={`nav-item ${active ? 'nav-item-active' : ''} ${item.disabled ? 'nav-item-disabled' : ''}`}
      onClick={(e) => !item.disabled && handleNavClick(item, e)}
      style={{ paddingLeft: depth * 16 }} // 层级缩进
    >
      {/* 图标 */}
      {item.icon && <span className="nav-item-icon">{item.icon}</span>}

      {/* 文本 */}
      <span className="nav-item-label">{item.label}</span>

      {/* 徽章 */}
      {item.badge && item.badge > 0 && <span className="nav-item-badge">{item.badge}</span>}

      {/* 下拉菜单指示器 */}
      {item.children?.length && <i className="fa fa-chevron-down nav-item-arrow" />}
    </LinkComponent>
  );
};

export default BaseNavItem;
