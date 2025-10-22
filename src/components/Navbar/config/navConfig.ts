// 定义导航项类型（核心扩展点）
export type NavItem = {
  // 基础属性
  key: string; // 唯一标识
  label: string; // 显示文本
  path: string; // 路由路径
  icon?: React.ReactNode; // 图标（可选）

  // 扩展属性
  type?: 'default' | 'dropdown' | 'external'; // 导航类型
  children?: NavItem[]; // 子菜单（下拉菜单用）
  permission?: string[]; // 权限控制（可选）
  disabled?: boolean; // 是否禁用
  badge?: number; // 徽章数字（如通知数）
  render?: (item: NavItem) => React.ReactNode; // 自定义渲染函数（最高优先级）
};

// 导航配置（可从接口动态获取）
const navConfig: NavItem[] = [
  {
    key: 'home',
    label: '首页',
    path: '/pagehome',
    // icon: <i className="fa fa-home" />,
    icon: 'fa fa-home',
  },
  {
    key: 'products',
    label: '产品',
    path: '/pagehome/products',
    type: 'dropdown',
    children: [
      { key: 'phone', label: '手机', path: '/pagehome/products/phone' },
      { key: 'laptop', label: '笔记本', path: '/pagehome/products/laptop' },
    ],
  },
  {
    key: 'about',
    label: '关于',
    path: '/pagehome/about',
    permission: ['admin', 'user'], // 仅特定权限可见
  },
  {
    key: 'external',
    label: '外部链接',
    path: 'https://example.com',
    type: 'external', // 外部链接（新窗口打开）
  },
];

export default navConfig;
