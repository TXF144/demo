// 导入 ESLint 核心配置和推荐的规则集
import js from '@eslint/js';

// 导入预定义的全局变量集合，用于指定代码运行环境
import globals from 'globals';

// 导入 React Hooks 相关的 ESLint 插件
import reactHooks from 'eslint-plugin-react-hooks';

// 导入 React Refresh 相关的 ESLint 插件，用于 Vite 开发环境
import reactRefresh from 'eslint-plugin-react-refresh';

// 导入 TypeScript-ESLint 插件和配置
import tseslint from 'typescript-eslint';

// 导入 ESLint 配置工具函数，用于设置全局忽略模式
import { globalIgnores } from 'eslint/config';

// 导入 Prettier 相关的包，用于集成代码格式化
import prettier from 'eslint-config-prettier'; // 禁用与 Prettier 冲突的 ESLint 规则
import pluginPrettier from 'eslint-plugin-prettier'; // 将 Prettier 作为 ESLint 规则运行

import importPlugin from 'eslint-plugin-import';

// 导出 ESLint 配置，使用 tseslint.config() 函数创建 TypeScript 友好的配置
export default tseslint.config([
  // 设置全局忽略模式，告诉 ESLint 忽略这些文件和目录
  globalIgnores(['dist']), // 忽略构建输出目录

  // 主要配置对象，定义 ESLint 的具体行为
  {
    // 指定此配置对象应用的文件范围
    files: ['**/*.{ts,tsx}'], // 匹配所有 TypeScript 和 TSX 文件

    // 扩展预定义的规则集，这些规则集提供了一组推荐的 ESLint 规则
    extends: [
      js.configs.recommended, // ESLint 推荐的 JavaScript 规则
      tseslint.configs.recommended, // TypeScript-ESLint 推荐的 TypeScript 规则
      reactHooks.configs['recommended-latest'], // React Hooks 的推荐规则
      reactRefresh.configs.vite, // 针对 Vite 的 React 快速刷新规则
      prettier, // 禁用与 Prettier 冲突的 ESLint 规则
    ],

    // 设置语言解析选项，告诉 ESLint 如何解析代码
    languageOptions: {
      ecmaVersion: 2020, // 指定代码使用的 ECMAScript 版本
      globals: globals.browser, // 指定代码运行在浏览器环境，添加浏览器全局变量
    },

    // 配置插件，插件提供额外的规则和功能
    plugins: {
      prettier: pluginPrettier, // Prettier 插件
      import: importPlugin, // Import 插件
    },

    // 自定义规则，覆盖或扩展扩展配置中的规则
    rules: {
      // React Refresh 规则：确保只有导出的组件会被快速刷新
      'react-refresh/only-export-components': [
        'warn', // 违反规则时显示警告
        { allowConstantExport: true }, // 允许导出常量
      ],

      // Prettier 规则：将 Prettier 格式问题作为 ESLint 错误
      // 具体的 Prettier 规则在 .prettierrc 文件中定义
      'prettier/prettier': 'error',

      // TypeScript 规则：忽略下划线开头的未使用变量
      '@typescript-eslint/no-unused-vars': [
        'error', // 违反规则时显示错误
        { argsIgnorePattern: '^_' }, // 忽略以下划线开头的参数
      ],

      // 代码质量规则：禁止使用 console.log，但允许 console.warn 和 console.error
      'no-console': [
        'warn', // 违反规则时显示警告
        { allow: ['warn', 'error'] }, // 允许的方法
      ],

      // 添加导入顺序规则
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js 内置模块（如 'path', 'fs'）
            'external', // 外部依赖（如 'react', 'lodash'）
            'internal', // 项目内部模块
            ['parent', 'sibling', 'index'], // 相对路径导入
            'type', // TypeScript 类型导入
          ],
          pathGroups: [
            {
              pattern: '{react,react-dom/**}', // React 相关模块优先
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always', // 组之间添加空行
          alphabetize: {
            order: 'asc', // 按字母顺序排序
            caseInsensitive: true, // 不区分大小写
          },
        },
      ],
    },
  },
]);
