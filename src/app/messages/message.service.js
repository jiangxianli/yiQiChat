(function () {
    'use strict';
    angular.module('yiqichat')
        .factory('Message', function (Restangular) {

            var service = Restangular.service('message');

            //发送文本消息
            service.sendTextMsg = function(params){

                return service.one('sendTextMsg').customPOST(params);
            };

            //消息列表
            service.msgList = function(params){

                return service.one('msgList').customPOST(params);
            };

            //未读消息对话列表
            service.unreadMsgList = function(){

                return service.one('unreadMsgList').customPOST();
            };

            //指定用户未读消息
            service.customerUnreadMsg = function(params){

                return service.one('customerUnreadMsg').customPOST(params);
            };

            //总未读消息数
            service.totalUnreadNum = function(){

                return service.one('totalUnreadNum').customPOST();
            };

            return service;
        });
})();
