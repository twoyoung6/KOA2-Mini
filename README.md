# KOA2-mini

### KOA 学习记录

### 项目描述

基于 koa2 + nunjucks + mongodb，实现了登录授权、静态 web 服务、基本的增删改查，404 错误处理，以及路由分层封装、DB 封装、模板引擎中间件的使用；

#### 项目结构

```
│  .gitignore
│  app.js // 程序入口
│  config.js // session 配置文件
│  package.json
│  README.md
│  router.js // 路由中间件
│  tree.txt
│
├─controllers // 业务接口
│
├─demo1 // 独立的 demo
│      hello.js
│      router.js
│
├─middleware
├─module // DB 中间件封装
│      db.js
│      dbConfig.js
│
├─node_modules
├─public // 静态 web 服务
├─static // 静态资源
│  ├─css
│  │
│  └─images
│
├─utils // 工具库
│
└─views // H5页面
    │
    └─template // 公共页面组件
```

### 项目启动

```
npm i
npm run start
```

### 服务地址

首页：http://localhost:5000/
