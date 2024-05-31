### 移动设备看调试三方库

> h5 在移动设备上看调试（日志、网络请求、路径）

```elm
npm install vconsole
```

`main.js`

```javascript
// 调试工具
if (ENV_CONFIG.ENV == 'dev') {
    const Vconsole = require('vconsole')
    const vConsole = new Vconsole()
    Vue.use(vConsole)
}
```

