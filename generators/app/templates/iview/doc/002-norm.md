# 开发总体规范

## 1. api规范

##### 1.1 后端是controller+路径的命名，前端api也以此规则命名

###### 增删改查列表分别是 add、delete、update、view、list

## 2. Vue组件开发相关

##### 2.1 view下面放模块页面(文件夹名字用后端模块名字定)，对应的组件放components下面，并且文件夹名字和view下面一致，文件名用'-'连接

## 3. 路由

##### 3.1. 路由也按照模块划分，命名同样按照后端的模块名字来定：模块名.js
##### 3.2. 每个路由都需要注释webpackChunkName，名称为小写的路由组件名，以‘-’链接

###### 详情见router文件夹下js文件

## 4. SVN提交代码

##### 4.1 以 {标签}: {内容} 这种方式来写
###### 标签有：优化，需求，bugs, 配置
注意：将package-lock.json和node_modules设置忽略提交

## 5. eslint代码规范

##### 5.1. 严格按照eslint规范执行，可以运行npm run lint来进行eslint自动代码规范修复实现0报警后再执行代码提交

## 6. 增加新依赖需要在群上进行通知和说明