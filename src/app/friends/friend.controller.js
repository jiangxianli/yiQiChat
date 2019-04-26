(function (_) {
    'use strict';
    angular.module('yiqichat')

        //朋友列表
        .controller('FriendController@list', function ($scope,Friend) {
            //模态消息提示
            var modal = UIkit.modal(".loadingModal");

            $scope.tipInfo = '朋友列表加载中...';
            $scope.friends = [];

            getFriends();

            //获取朋友列表
            function getFriends(){
                //开启模态提示
                modal.show();

                Friend.list().then(function(data){

                    $scope.friends = data;
                    if (data.length <= 0) {
                        $scope.tipInfo = '您还没有朋友，到附近加一个吧！';
                        setTimeout(function () {
                            modal.hide();
                        }, 1000);
                    } else {
                        modal.hide();
                    }
                });
            }
        })

        //添加朋友
        .controller('FriendController@add', function ($rootScope,$scope,Friend,EasemobUtil,Notification,$state) {

            //对方同意我的好友请求
            $rootScope.$on('onSubscribe',function(data){

                getApplyList();

            });

            $scope.applyList = [];

            //搜索好友
            $scope.search = function(){

                var params = {
                    query:$scope.query
                };
                Friend.search(params).then(function(data){

                    $scope.query = '';
                    if(!data.mobile){

                        Notification.error('未查询到符合条件的用户')

                    }else{

                        $state.go("customers.detail",{uuid:data.uuid});

                    }

                });

            };

            //申请加好友
            $scope.apply = function(to){

                var params = {
                    to:to,
                    message:'加个好友吧'
                };
                EasemobUtil.subscribe(params);
                Notification.info('已发送')
                $scope.findCustomers = [];
            };

            //同意加好友请求
            $scope.subscribed = function(to){

                var params = {
                    to:to,
                    message:"[resp:true]"
                };
                EasemobUtil.subscribe(params);
                EasemobUtil.subscribed(params);

                Friend.agree({
                    'to':to,
                    'type':'agree'
                }).then(function(){

                    getApplyList();
                    Notification.info('已发送接受')
                });

            };

            getApplyList();

            //获取好友申请列表
            function getApplyList(){

                Friend.getApplyList().then(function(data){

                    $scope.applyList = data;

                });

            }

        })

        //设置好友备注
        .controller('FriendController@setRemark', function ($rootScope,$scope,Friend,EasemobUtil,Notification,$state,$stateParams) {

            $scope.friend = {};
            $scope.friend.remark = '';

            //获取好友信息
            Friend.find({friend_id:$stateParams.id}).then(function(data){

                $scope.friend = data;
            });

            //设置备注
            $scope.setRemark = function(){
                if($scope.friend.remark){

                    Friend.setRemark({friend_id:$stateParams.id,remark:$scope.friend.remark}).then(function(){

                        $state.go('customers.detail',{uuid:$scope.friend.uuid})
                    })

                }

            }


        });
})(_);
