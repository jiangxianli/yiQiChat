(function () {
    'use strict';
    angular.module('yiqichat')
        //封装环信JS方法
        .service('EasemobUtil', function () {

            return {

                conn :null,
                //登录
                login:function(username,password){

                    this.conn.open({
                        user : username,
                        pwd : password,
                        appKey : '144disk#yiqichat'
                    });
                },
                //注册账号
                register:function(username,password,successFunction,errorFunction){
                    var options = {
                        username : username,
                        password : password,
                        appKey : '144disk#wechat',
                        success : successFunction,
                        error : errorFunction
                    };
                    Easemob.im.Helper.registerUser(options);
                },
                //订阅
                subscribe:function(params){

                    this.conn.subscribe(params);
                },
                //反向订阅
                subscribed:function(params){

                    this.conn.subscribed(params);
                },

                //发送文本消息
                sendTextMessage:function(params){

                    this.conn.sendTextMessage(params);
                },
                //格式化文本消息
                formatTextMessage:function(message,userId){

                        return {
                            'id':message.id,
                            'data':message.data,
                            'ext':message.ext,
                            'from':message.from,
                            'to':message.to,
                            'type':'chat',
                            'class':message.from == userId ? 'owner' : 'other'
                        }
                    }

                };

        });
})();
