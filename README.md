<h1>
数据治理平台前端项目
    <h3>这是一个使用 Vue.js 和 iView 组件库构建的数据治理平台的前端项目，用于管理和处理数据资源。</h3>
</h1>

[![](https://img.shields.io/github/release/iview/iview-admin.svg)](https://github.com/iview/iview-admin/releases)
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.17-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-3.2.2-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)
[![npm](https://img.shields.io/npm/l/express.svg)]()

## 项目介绍

本项目旨在创建一个功能强大的数据治理平台，能够方便地管理、处理和可视化各种数据资源。项目使用 iView 组件库提供的丰富 UI 组件，以及 Vue.js 的灵活性，使得用户能够高效地进行数据管理和分析。

## 功能特点
使用 iView 组件库，提供丰富的 UI 组件和交互效果。
实现数据资源的元数据管理以及上传、下载、管理功能。
路由页面的配置集中在 src/router/router.js 文件中。
前后端交互接口定义在 src/api/datasource.js 和 src/api/assets.js 中。
页面组件存放在 src/views/ 目录中。


## 目录结构
```
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── api/
│   │   ├── datasource.js
│   │   ├── assets.js
│   │   └── ...
│   ├── assets/
│   ├── components/
│   ├── router/
│   │   └── router.js
│   ├── views/
│   │   ├── Dashboard.vue
│   │   ├── DataSource.vue
│   │   └── ...
│   ├── App.vue
│   └── main.js
├── docs/
│   ├── deployment.md
│   └── ...
├── README.md
└── ...

```


## 开始使用
```bush
# clone the project
git clone https://github.com/spacezyx/DataGovernancePlatform_Frontend.git

// install dependencies
npm install

// develop
npm run dev
```

## 构建项目
```bush
npm run build
```

## 许可证
[MIT](http://opensource.org/licenses/MIT)


