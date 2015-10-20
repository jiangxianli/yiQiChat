# yiQiChat
    基于AngularJS，环信通信的Web即时聊天工具
# 知识储备
    node、npm、bower、gulp、less、angularJS
#安装
    1. 安装node ,安装完使用node -v 检查是否安装成功
    2. node 安装完成后，使用npm -v 检查是否可以使用npm
    3. npm install --global bower
    4. npm install --global npm
    5. npm install
    6. gulp serve,启动本地serve,如遇到 module 'xxx' not found 则 使用npm install xxx 来安装

#gulp 命令
    gulp clean  清理档案 //dist .tmp  文件夹被清理掉    
    gulp build  文件打包 //打包 到dist文件夹

#项目结构

    ├── README.md   
    ├── bower.json  
    ├── bower_components //bower install后安装的插件库  
    │   ├── Chart.js    
    │   │       
    │   ├── .....   
    │   │       
    │   └── uikit   
    │   
    ├── dist //gulp build 打包后的文件  
    │   ├── assets  
    │   ├── favicon.ico     
    │   ├── fonts   
    │   ├── index.html  
    │   ├── scripts     
    │   └── styles      
    ├── e2e     
    │   ├── main.po.js      
    │   └── main.spec.js        
    ├── gulp //gulp task 列表       
    │   ├── build.js        
    │   ├── conf.js     
    │   ├── e2e-tests.js    
    │   ├── inject.js   
    │   ├── scripts.js  
    │   ├── server.js   
    │   ├── styles.js   
    │   ├── unit-tests.js   
    │   └── watch.js    
    ├── gulpfile.js     
    ├── karma.conf.js   
    ├── node_modules //npm install 安装的node modules   
    │   ├── accord      
    │   ├── ......      
    │   └── wrench      
    ├── package.json        
    ├── protractor.conf.js      
    └── src
        ├── app     
        │   ├── components //自己写的组件 directives集合        
        │   ├── customer //自己模块     
        │   │   ├── customer.controller.js //控制器     
        │   │   ├── customer.route.js   //路由      
        │   │   ├── customer.service.js //资源服务 restangular      
        │   │   └── views //视图文件            
        │   ├── friends     
        │   ├── index.config.js //config配置        
        │   ├── index.constants.js //全局常量       
        │   ├── index.filter.js //过滤器        
        │   ├── index.interceptor.js //请求、响应拦截器     
        │   ├── index.less //整站样式 @import less文件下的文件      
        │   ├── index.module.js //引用插件module        
        │   ├── index.route.js //全局路由       
        │   ├── index.run.js //run 启动控制     
        │   ├── index.service.js        
        │   ├── index.utils.js //常用方法工具包     
        │   ├── layout //自己模块       
        │   ├── messages //自己模块     
        │   ├── moods //自己模块        
        │   └── zone //自己模块     
        ├── assets //资源文件       
        │   ├── fonts       
        │   ├── images      
        │   └── music       
        ├── favicon.ico     
        ├── index.html //入口文件       
        └── less //样式less文件     
            ├── app.less        
            ├── loading-bar.less        
            ├── login.less      
            └── zone.less       

#功能简介
##1.即时消息
    基于环信即时云通信，可以进行实时消息通信
##2.我的好友
    可以通过查找加好友
##3.附近的人
    通过地理定位功能，查找附近的人，并显示距离范围
##4.心情广场
    可以发布自己的即时心情，进入广场的人即可看到你的动态
##5.个人设置
    可以设置自己的头像及个人资料等
#项目试玩
[一起玩](http://chat.jiangxianli.com)