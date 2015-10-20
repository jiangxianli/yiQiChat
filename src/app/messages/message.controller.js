(function (_) {
    'use strict';
    angular.module('yiqichat')

        //消息列表
        .controller('MessageController@list', function ($scope,EasemobUtil,localStorageService,Message,UserService,$state,$rootScope) {

            $scope.state = $state;

            //消息接收监听
            $scope.$on('onTextMessage',function(){

                getMsgList();

            });

            $scope.$on('setUser',function(d,data){

                $scope.user = data

            });

            $scope.user = UserService.user;

            $scope.messages = [];

            getMsgList();

            //获取消息列表
            function getMsgList(){

                Message.unreadMsgList().then(function(data){

                   $scope.messages = data;

                   //更新总未读消息
                   $rootScope.getTotalUnreadMsgNum();

                });
            }

        })

        //对话详情
        .controller('MessageController@detail', function ($scope,EasemobUtil,$stateParams,Customer,Notification,Message,UserService,$rootScope) {

            $scope.user = UserService.user;


            $scope.messages = [];
            $scope.friend = {};
            $scope.friend.id = $stateParams.id;
            $scope.content = ''
            $scope.messages = [];

            getMsgList();

            if($stateParams.id){

                Customer.find({'id':$stateParams.id}).then(function(data){

                    $scope.friend = data;

                })
            }


            //消息接收监听
            $scope.$on('onTextMessage',function(d,data){

                getMsgList();

            })

            $scope.$on('setUser',function(d,data){

                $scope.user = data
            });


            //发送消息
            $scope.sendTextMessage = function(){

                if($.trim($scope.content) == ""){

                    return false;
                }


                Message.sendTextMsg({
                    to:$scope.friend.id,
                    content:$scope.content

                }).then(function(){

                    $scope.content = ''

                    getMsgList();
                    setTimeout(function(){
                        EasemobUtil.sendTextMessage({
                            'to':$scope.friend.easemob_username,
                            'msg':$scope.content
                        });
                    },500)


                });
                $scope.content = ''
            };

            //获取消息列表
            function getMsgList(){

                Message.msgList({to:$scope.friend.id}).then(function(data){

                    $scope.messages = data;

                    //更新总未读消息
                    $rootScope.getTotalUnreadMsgNum();

                    setTimeout(function(){

                        $('html,body').animate({scrollTop: $('.content-wrapper').height()},0);

                    },50)


                })
            }



        })
})(_);
