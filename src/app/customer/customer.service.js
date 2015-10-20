(function () {
    'use strict';
    angular.module('yiqichat')
        .factory('Customer', function (Restangular) {

            var service = Restangular.service('customer');

            //用户注册
            service.register = function(params){

                return service.one('register').customPOST(params);
            };

            //用户登录
            service.login = function(params){

                return service.one('login').customPOST(params);
            };

            //获取登录用户信息
            service.getUserInfo = function(){

                return service.one('auth').customPOST();

            };

            //搜索用户
            service.find = function(params){

                return service.one('find').customPOST(params);
            };

            //设置用户定位信息
            service.setLocation = function(params){

                return service.one('setLocation').customPOST(params);
            };

            //获取附近用户列表
            service.nearby = function(){

                return service.one('nearby').customPOST();
            };

            //用户详情
            service.detail = function(params){

                return service.one('detail').customPOST(params);
            };

            //设置用户地址
            service.setAddress = function(params){

                return service.one('setAddress').customPOST(params);
            };

            //设置用户昵称
            service.setUserName = function(params){

                return service.one('setUserName').customPOST(params);
            };

            //设置用户个人简介
            service.setIntro = function(params){

                return service.one('setIntro').customPOST(params);
            };

            //设置用户性别
            service.setSex = function(params){

                return service.one('setSex').customPOST(params);
            };

            //创建用户二维码
            service.createQrcode = function(){

                return service.one('createQrcode').customPOST();
            };

            return service;
        });
})();
