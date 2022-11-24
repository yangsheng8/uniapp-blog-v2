# uniapp 开发 blog-v2

## 配置项目开发环境

1. `uniapp` 同样提供了一个专门的开发工具 `HBuilder X`
2. 创建项目，选择了 vue2 版本

## 项目目录介绍

```js
├─api          // 存放后端返回数据的api
├─components   // 存放组件
├─filters      // 存放vue2过滤器,vue3废弃了这个功能
├─node_modules  // 存放npm包
├─pages			    // 页面存放文件夹，等同于 微信小程序中的 pages
│  └─index			// 默认生成的页面
├─static			  // 静态资源存放文件夹
├─store          // vuex存放数据
  └─modules      // store 模块
  └─index        // 注册store
├─styles          //  存放整体css
├─subpkg          // 分包-类似二级页面
└─uni_modules		// uni-app组件目录
│  └─uni-xxx		// uni-app 所提供的业务组件，等同于 微信小程序中的组件
├─App.vue			// 应用配置文件，用来配置全局样式、生命周期函数等，等同于 微信小程序中的app.js
├─index.html    //h5 指定入口文件
└─main.js			// 项目入口文件
├─mainfest.json		 // 配置应用名称、appid、logo、版本等打包信息，
└─pages.json		// 配置页面路径、窗口样式、tabBar 等页面类信息，等同于 微信小程序中的app.json
└─uni.scss			// uni-app内置的常用样式变量
```

## 安装 npm 包

```js
yarn init -y
```
