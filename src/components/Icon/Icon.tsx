import React, { useState, useEffect } from 'react';
import type { SVGProps } from 'react';

/**
 * 1. 修正 glob 配置：
 *  - 去掉模式中的 ?react，改为在 query 中配置（告诉 @svgr/vite 转换为 React 组件）
 *  - 明确 import: 'default' 直接获取默认导出（组件）
 *  - eager: false 保持按需加载（返回加载函数）
 */
const iconModules = import.meta.glob(
  '@/assets/icons/*.svg', // 正确匹配 .svg 文件（无多余参数）
  {
    eager: false,
    import: 'default', // 直接提取 default 导出（避免每次写 module.default）
    query: 'react', // 关键：告诉 @svgr/vite 转换为 React 组件
  },
);

/**
 * 2. 优化映射逻辑：
 *  - 命名改为 iconPathMap（更准确：图标名 → 完整路径）
 *  - 用更可靠的正则提取文件名（兼容特殊路径）
 *  - 加调试日志，方便确认是否匹配到文件
 */
const iconPathMap = Object.keys(iconModules).reduce(
  (acc, fullPath) => {
    // 从完整路径提取文件名（如 "@/assets/icons/maple-leaf.svg" → "maple-leaf"）
    const nameMatch = fullPath.match(/\/([^/]+)\.svg$/);
    if (nameMatch?.[1]) {
      const iconName = nameMatch[1];
      acc[iconName] = fullPath;
    }
    return acc;
  },
  {} as Record<string, string>,
);

// 调试：确认是否匹配到图标（开发环境可见，生产环境会被 tree-shake）
if (import.meta.env.DEV) {
  console.log('匹配到的图标路径映射：', iconPathMap);
  if (Object.keys(iconPathMap).length === 0) {
    console.warn('⚠️  未匹配到任何图标，请检查 glob 模式和文件路径');
  }
}

/**
 * 3. 优化类型定义：
 *  - 用 keyof typeof iconPathMap 静态获取所有图标名（TypeScript 可识别）
 *  - 确保 IconName 是所有实际存在的图标名的联合类型
 */
export type IconName = keyof typeof iconPathMap;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName; // 严格约束：只能传存在的图标名
  className?: string;
  fallback?: React.ReactNode;
  // 新增：加载时的占位内容
  loadingPlaceholder?: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = 'w-5 h-5',
  fallback = (
    <div
      className={`${className} flex items-center justify-center border border-gray-300 text-gray-400`}
    >
      ⚠️
    </div>
  ),
  loadingPlaceholder = <div className={className} />, // 加载时的空白占位（避免UI跳动）
  ...props
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<
    SVGProps<SVGSVGElement>
  > | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 重置状态（避免切换图标时显示旧内容/错误）
    setIconComponent(null);
    setError(false);

    const loadIcon = async () => {
      try {
        // 4. 关键校验：确认路径存在
        const targetPath = iconPathMap[name];
        if (!targetPath) {
          throw new Error(`图标 "${name}" 不存在（检查文件名是否正确）`);
        }

        // 5. 确认加载函数存在（双重保险）
        const loadFn = iconModules[targetPath];
        if (typeof loadFn !== 'function') {
          throw new Error(`图标 "${name}" 的加载函数不存在（路径：${targetPath}）`);
        }

        // 加载组件（因配置了 import: 'default'，直接拿到组件）
        const component = await loadFn();
        console.log('加载的图标内容：', component);
        setIconComponent(component as React.ComponentType<SVGProps<SVGSVGElement>>);
      } catch (err) {
        console.error(`加载图标失败：`, err);
        setError(true);
      }
    };

    loadIcon();
  }, [name]);

  // 状态优先级：错误 → 加载中 → 正常渲染
  if (error) return fallback;
  if (!IconComponent) return loadingPlaceholder;

  return <IconComponent className={className} {...props} />;
};

export default Icon;
