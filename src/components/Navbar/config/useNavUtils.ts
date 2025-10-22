import { useMatch, useNavigate } from 'react-router-dom';

import type { NavItem } from '../config/navConfig';

/**
 * 导航栏路由工具钩子
 * 封装路由匹配、跳转等逻辑，与UI组件解耦
 */
/**
 * 导航工具自定义 Hook
 * 提供导航相关的工具函数，包括活跃路由判断、导航点击处理和权限过滤等功能
 * @returns {Object} 包含导航工具函数的对象
 */
export const useNavUtils = () => {
  const navigate = useNavigate();

  // 判断导航项是否为当前活跃路由的自定义 Hook
  const useIsActive = (item: NavItem) => {
    // 总是调用 useMatch，但根据条件决定是否使用其结果
    const match = useMatch({
      path: item.type !== 'external' ? item.path : '/',
      end: item.type !== 'external' ? !item.children?.length : true,
    });

    // 外部链接不参与活跃判断
    if (item.type === 'external') return false;
    return match !== null;
  };

  // 处理导航点击
  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();

    // 外部链接处理
    if (item.type === 'external') {
      window.open(item.path, '_blank');
      return;
    }

    // 内部路由跳转
    navigate(item.path);
  };

  // 过滤无权限的导航项（示例逻辑）
  const filterByPermission = (items: NavItem[], userPermissions: string[] = []) => {
    return items.filter((item) => {
      // 无权限要求的导航项直接显示
      if (!item.permission?.length) return true;
      // 有权限要求的需满足至少一个权限
      return item.permission.some((perm) => userPermissions.includes(perm));
    });
  };

  return {
    useIsActive,
    handleNavClick,
    filterByPermission,
  };
};
