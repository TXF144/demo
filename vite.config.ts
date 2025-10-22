import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // 配置 SVGR 选项（可选，但推荐）
      svgrOptions: {
        typescript: true, // 生成 TypeScript 类型（推荐）
        dimensions: false, // 移除 SVG 默认的 width/height，方便通过 className 控制大小
        // 其他配置参考：https://react-svgr.com/docs/options/
      },
      // 可选：指定需要转换的 SVG 文件路径（避免影响其他 SVG 用途）
      include: 'src/assets/icons/**/*.svg', // 精确匹配图标目录的 SVG
      // 关键：显式指定 esbuild 以 TypeScript 方式处理 SVG 转换结果
      esbuildOptions: {
        loader: 'tsx', // 强制用 tsx  loader 解析，确保 TypeScript 语法被识别
        target: 'esnext',
      },
    }),
    // svgr({
    //   include: 'src/assets/icons/**/*.svg', // 精确匹配图标目录
    //   svgrOptions: {
    //     dimensions: false, // 移除默认宽高，方便通过 className 控制
    //     ref: true, // 允许添加 ref 属性
    //     icon: true, // 关键：优化 SVG 作为图标使用的默认配置
    //     svgoConfig: {
    //       plugins: [
    //         // 可选：移除 SVG 中的 fill 属性，方便通过 CSS 控制颜色
    //         { name: 'removeAttrs', params: { attrs: 'fill' } },
    //       ],
    //     },
    //   },
    // }),
  ],
  // 3. Vite 7 中 esbuild.loader 仅支持单个 loader，这里用默认 tsx 处理
  esbuild: {
    loader: 'tsx', // 对所有文件默认用 tsx 解析（安全，因为非 TSX 文件会自动降级处理）
    jsx: 'automatic',
  },
  // 确保Vite能正确解析.svg.tsx扩展名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 确保 @ 别名正确指向 src
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'], // 添加常用扩展名
  },
  // 开发服务器配置（根据需要启用）
  // server: {
  //   host: 'localhost',
  //   port: 5173,
  //   open: true, // 自动打开浏览器
  // }
});
