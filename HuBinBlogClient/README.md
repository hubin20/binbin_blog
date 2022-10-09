# Vue 3 + TypeScript + Vite

## vite 创建项目

npm create vite@latest
npm install

## 安装三方包

/\*\*

- npm i --save-dev @types/node type:['node']
- npm i vite-plugin-style-import consola -D
- axios
- pinia
- less
- normalize.css
- vue-router
- element-plus
- prettier
- eslint-plugin-prettier
- eslint-config-prettier
- npm install mavon-editor --save
- wangeditor
  \*/

## 项目框架

## 代码规范

集成 editorconfig 配置
配置.prettierrc 文件
安装 prettier 的插件
创建.prettierignore 忽略文件
package.json 中配置一个 scripts

```json
"prettier": "prettier --write ."
```

使用 ESLint 检测
安装 ESLint 插件
npm i eslint-plugin-prettier eslint-config-prettier -D
配置.eslintrc.js
配置别名
vite.config.js 里面配置别名

```json
resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
```

tsconfig.json 里面配置@别名出现路径

````json
"baseUrl": "./",
"paths": {
      "@/*": ["src/*"]
    }```
````
