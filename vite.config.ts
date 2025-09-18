import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 使用新的插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
