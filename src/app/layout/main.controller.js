(function () {
    'use strict';
    angular.module('yiqichat')
        .controller('MainController', function ($scope,Upload,env,UserService,Utils,Notification) {

            $scope.custImg ={};
            $scope.user = UserService.user;

            $scope.$on('setUser', function(d,data){

                $scope.user = data;
            });

            $scope.updateCustImg = function(file){

                if(!file) return false;

                if(Utils.isWxBrowser()){
                    Notification.info('微信浏览器暂不支持图片上传功能！')
                    return false;
                }

                Upload.upload({
                    url: env.baseUrl + "/customer/uploadImage",
                    file: file,
                    method: "POST",
                    sendFieldsAs: 'form'
                }).progress(function (evt) {


                }).success(function (data, status, headers, config) {

                    UserService.setImageUrl(data.data.url);
                    $scope.user = UserService.user;

                }).error(function (data, status, headers, config) {



                });

            }


        })

})();
