# babel-insert-arguments
给console中的方法调用增加参数，显示调用位置，包括行和列。

## 安装
```bash
npm i -D @nk/babel-insert-arguments
```

## 使用
babel.cofig.js
```javascript
const babelInsertArguments = require('@nk/babel-insert-arguments').default;

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    babelInsertArguments
  ]
}

```

### 例子
``` javascript
console.log(1)

// loc: (行, 列) 1
```