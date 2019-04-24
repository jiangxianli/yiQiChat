(function (window) {
    'use strict';
    angular.module('yiqichat')
        //用户登录
        .controller('UserController@login', function ($scope, $log, UserService, $state, Notification, $auth,EasemobUtil,Customer,$rootScope) {
            //登录按钮点击状态
            $scope.clicked = false;

            $scope.login = function(){

                $scope.clicked = true;

                var params = {
                    account:$scope.account,
                    password:$scope.password
                };

                Customer.login(params).then(function(data){

                    //设置token 保持登录
                    $auth.setToken(data.meta.token);

                    //同时登录环信账号
                    EasemobUtil.login(data.easemob_username, data.easemob_password);

                    UserService.setUser(data);

                    $rootScope.setLocation(function(){ },function(){ });

                },function(){
                    $scope.clicked = false;
                });


            };

        })
        //用户注册
        .controller('UserController@register', function ($scope, Customer,Notification,$state) {
            //注册按钮点击状态
            $scope.clicked = false;

            $scope.register = function(){

                $scope.clicked = true;

                var params = {
                    account:$scope.account,
                    password:$scope.password
                };

                Customer.register(params).then(function(data){

                    //注册成功，跳转向登录页
                    Notification.info('注册成功，请登录')
                    $state.go('users.login')


                },function(){

                    $scope.clicked = false;

                });


            };

        })
        //用户详情
        .controller('UserController@detail', function ($scope, $state, Customer, UserService, $stateParams, Notification, $auth,EasemobUtil) {

                $scope.customer = {};
                $scope.user = UserService.user;

                $scope.$on('setUser',function(d,data){

                    $scope.user = data;
                    //判断是否是当前登录者的，跳转到个人信息页
                    if($scope.user.uuid == $stateParams.uuid){

                        $state.go('zone.profile')
                    }

                });
                //判断是否是当前登录者的，跳转到个人信息页
                if($scope.user.uuid == $stateParams.uuid){

                    $state.go('zone.profile')
                }

                getCustomerDetail();
                //获取用户详情
                function getCustomerDetail(){

                    Customer.detail({uuid:$stateParams.uuid}).then(function(data){

                        $scope.customer = data;

                    })

                }

                //加好友
                $scope.apply = function(to){

                    var params = {
                        to:to,
                        message:'加个好友吧'
                    };

                    EasemobUtil.subscribe(params);
                    Notification.info('已发送')
                }
        });

})();
