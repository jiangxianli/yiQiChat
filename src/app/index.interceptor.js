(function () {
    'use strict';
    angular.module('yiqichat')
        //请求响应拦截器
        .factory('requestInterceptor', function ($q, $injector, $log, UserService) {

            var requestInterceptor = {

                request: function (config) {

                    //注入
                    var cfpLoadingBar = $injector.get('cfpLoadingBar');


                    cfpLoadingBar.start();

                    return config;
                },
                response: function (response) {

                    var cfpLoadingBar = $injector.get('cfpLoadingBar');
                    cfpLoadingBar.complete();

                    //console.info(response)

                    return response;

                    //return $q.reject(response);
                },
                requestError: function (config) {

                    return $q.reject(config);
                },
                responseError: function (response) {

                    var Notification = $injector.get('Notification');
                    var cfpLoadingBar = $injector.get('cfpLoadingBar');
                    var $state = $injector.get('$state');

                    var $rootScope = $injector.get('$rootScope');

                    cfpLoadingBar.complete();

                    //验证错误
                    if (response.status === 422) {

                        Notification.error(response.data.message);
                    }
                    //未登录拦截
                    if (response.status === 401) {

                        UserService.setImageUrl('assets/images/del/d1.png');

                        //Notification.error(response.data.message);
                        Notification.error('您还没有登录或登录已失效！');

                        $state.go('users.login');

                    }
                    return $q.reject(response);
                }
            };

            return requestInterceptor;
        });
})();