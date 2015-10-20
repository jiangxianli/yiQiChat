(function () {
    'use strict';
    angular.module('yiqichat')
        .factory('Friend', function (Restangular) {

            var service = Restangular.service('friend');

            //搜索好友
            service.search = function(params){

                return service.one('search').customPOST(params);
            };

            //获取好友申请列表
            service.getApplyList = function(){

                return service.one('applyList').customGET();
            };

            //加好友
            service.apply = function(params){

                return service.one('apply').customPOST(params);
            };

            //同意加好友请求
            service.agree = function(params){

                return service.one('agree').customPOST(params);
            };

            //好友列表
            service.list = function(){

                return service.one('list').customGET();
            };

            //设置备注
            service.setRemark = function(params){

                return service.one('setRemark').customPOST(params);
            };

            //好友详情
            service.find = function(params){

                return service.one('find').customPOST(params);
            };

            return service;
        });
})();
