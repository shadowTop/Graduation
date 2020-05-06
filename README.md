# 物联网云监控系统
以家居系统作为物联网智能终端，通过环境特征参数采集模块，采集智能家居中如光照﹑温度﹑湿度等各类参数，利用 WiFi无线通讯的方式实现数据汇集上传；云控制服务器部分，通过构建运行环境，建立与智能终端的连接，对采集到的数据进行存储与管理；云平台客户端部分，利用 web 开发技术， 设计友好的人机交互页面， 兼容多种设备， 实现对智能终端的实时动画展示及控制。同时应用 HTML5 和 Javascript 技术，实现对数据的图像化展示，拓展用户使用功能。


## 前端使用的技术
- Vue全家桶,包括Vue + VueRouter + Vuex + 一些 Vue 组件
- element-ui
- 用到的预处理器是Stylus、Pug、Babel

## 后端使用
- Koa.js 基于node.js 
- 数据库使用的是MongoDB

## 通信
- MQTT: Promise + MQTT 通信框架
- axios


## 项目预览调试
- 需要的基础知识以及准备情况
  1. 掌握npm安装依赖的方法
  2. Vue基础 
  3. MongoDB数据库安装配置
- 使用git clone命令下载仓库源码
- 进入源码目录
- 首先全局安装npm i vue-cli -g，当然本项目基本上是采用yarn，所以也可以yarn global add vue-cli。
- 然后执行 yarn install 安装依赖
- 然后配置config目录下的db.json && file.json  && key.json
- 运行前端 npm run serve
- 启动数据库  mongod --config E:/MongoDB/mongo.conf
- cd server && nodemon
- cd files && nodemon
- cd mqtt && nodemon

  

