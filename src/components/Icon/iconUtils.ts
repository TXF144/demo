import type { ComponentType } from 'react';
import { lazy } from 'react';

// 定义SVG图标组件类型
export type SvgIconComponent = ComponentType<React.SVGProps<SVGSVGElement>>;

// 动态导入所有SVG文件
export const svgModules = import.meta.glob<{ default: SvgIconComponent }>(
  '/src/assets/icons/**/*.svg',
  {
    eager: false,
  },
);

// 提取图标名称
export const iconNames = Object.keys(svgModules).map((path) =>
  path.replace(/^\/src\/assets\/icons\//, '').replace(/\.svg$/, ''),
);

// 开发环境下打印可用图标列表
if (import.meta.env.DEV) {
  console.log('📦 可用图标列表:', iconNames);
}

// 图标名称类型
export type IconName = (typeof iconNames)[number];

// 缓存已加载的图标组件
export const iconCache = new Map<IconName, ReturnType<typeof lazy>>();

// 获取图标组件的工具函数
export const getIconComponent = (name: IconName) => {
  if (iconCache.has(name)) {
    return iconCache.get(name);
  }

  const svgPath = `/src/assets/icons/${name}.svg`;
  const moduleKey = Object.keys(svgModules).find((key) => key === svgPath);

  if (!moduleKey) {
    return null;
  }

  const SvgComponent = lazy(() =>
    svgModules[moduleKey]().then((module) => ({
      default: module.default,
    })),
  );

  iconCache.set(name, SvgComponent);
  return SvgComponent;
};
