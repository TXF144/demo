import prettier from 'prettier';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.resolve(__dirname, 'src/test.tsx');

try {
  const config = await prettier.resolveConfig(file, {
    editorconfig: true,
  });

  console.log('Prettier configuration for', file);
  console.log(JSON.stringify(config, null, 2));
} catch (error) {
  console.error('Error resolving Prettier config:', error);
}
