declare module '*.svg?react' {
  import React from 'react';
  // 声明带 ?react 后缀的 SVG 为 React 组件
  const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}

// 同时保留对普通 SVG 的声明（如需作为图片资源使用）
declare module '*.svg' {
  // 普通 SVG 导入返回文件路径字符串
  const src: string;
  export default src;
}
