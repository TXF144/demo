import path from 'path'; // 注意：需要导入 path 模块（Node.js 内置）

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
      include: 'src/assets/icons/**/*.svg', // 明确指定要转换的SVG目录（精确匹配）
      svgrOptions: {
        dimensions: false, // 移除SVG默认宽高，方便用className控制
        ref: true, // 允许添加ref
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 关键：确保 @ 指向项目根目录下的 src 文件夹
    },
    // server: {
  },
  //   host: 'txf.com', // 设置开发服务器的主机名
  // },
});
