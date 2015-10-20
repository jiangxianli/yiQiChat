(function () {
    'use strict';
    angular.module('yiqichat')
        .factory('Mood', function (Restangular) {

            var service = Restangular.service('mood');

            //发表心情
            service.create = function(params){

                return service.one('create').customPOST(params);
            };

            //心情上传图片
            service.uploadImage = function(params){

                return service.one('uploadImage').customPOST(params);
            };

            //心情列表
            service.getList = function(){

                return service.one('getList').customPOST();
            };

            //心情点赞
            service.praise = function(params){

                return service.one('praise').customPOST(params);
            };

            //心情详情
            service.detail = function(params){

                return service.one('detail').customPOST(params);
            };

            //心情评论列表
            service.comments = function(params){

                return service.one('comments').customPOST(params);
            };

            //添加评论
            service.addComment = function(params){

                return service.one('addComment').customPOST(params);
            };

            return service;
        });
})();
