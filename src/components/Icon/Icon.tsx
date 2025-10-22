import React, { Suspense, useMemo } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import { iconNames, getIconComponent } from './iconUtils';

import type { IconName } from './iconUtils';

// 错误边界组件
export class IconErrorBoundary extends React.Component<
  {
    children: ReactNode;
    fallback: ReactNode;
    name?: IconName;
    onIconError?: (error: Error) => void;
  },
  { hasError: boolean }
> {
  constructor(props: {
    children: ReactNode;
    fallback: ReactNode;
    name?: IconName;
    onIconError?: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: true } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`图标 "${this.props.name}" 加载失败:`, error, errorInfo);
    if (this.props.onIconError) {
      this.props.onIconError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 图标组件属性
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  /** 图标尺寸，同时设置width和height，优先级低于单独设置的width/height */
  size?: number | string;
  /** 图标不存在或加载失败时显示的内容 */
  fallback?: ReactNode;
  /** 加载中显示的内容 */
  loading?: ReactNode;
  /** 图标加载失败时的回调 */
  onIconError?: (error: Error) => void;
}

// 核心图标组件
const Icon: React.FC<IconProps> = ({
  name,
  className = 'w-6 h-6',
  size,
  fallback = <div className="w-6 h-6 text-gray-400">❌</div>,
  loading = <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div>,
  onIconError,
  width,
  height,
  ...props
}) => {
  // 计算尺寸属性
  const dimensionProps = useMemo(() => {
    if (size) {
      return {
        width: width ?? size,
        height: height ?? size,
      };
    }
    return { width, height };
  }, [size, width, height]);

  // 获取图标组件（使用缓存）
  const SvgComponent = useMemo(() => getIconComponent(name), [name]);

  // 图标不存在的情况
  if (!SvgComponent) {
    if (import.meta.env.DEV) {
      console.warn(`⚠️ 图标 "${name}" 不存在，可用图标:`, iconNames);
    }
    if (onIconError) {
      onIconError(new Error(`图标 "${name}" 不存在`));
    }
    return <>{fallback}</>;
  }

  return (
    <IconErrorBoundary fallback={fallback} name={name} onIconError={onIconError}>
      <Suspense fallback={loading}>
        <SvgComponent className={className} {...dimensionProps} {...props} />
      </Suspense>
    </IconErrorBoundary>
  );
};

export default Icon;
