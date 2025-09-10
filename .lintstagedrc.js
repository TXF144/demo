export default {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,less}': ['stylelint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
