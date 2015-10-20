(function () {
    'use strict';
    angular.module('yiqichat')
        .run(function ($http, $rootScope, $state, UserService, Restangular, $auth, Customer, env,EasemobUtil,Friend,geolocation,Notification,LocationService,Message,Utils) {


            //新的朋友申请数量
            $rootScope.totalNewApply = 0;

            //获取新的朋友申请数量
            $rootScope.getTotalApplyNum = function(){

                Friend.getApplyList().then(function(data){

                    var count = 0;
                    _.forEach(data,function(item){
                        if(item.is_received == 0) count++;
                    })

                    $rootScope.totalNewApply = count;

                });
            };


            //消息总未读数
            $rootScope.totalUnreadNum = 0;

            $rootScope.getTotalUnreadMsgNum  = function(){

                Message.totalUnreadNum().then(function(data){

                    $rootScope.totalUnreadNum = data;
                })
            };



            //消息提示声音
            $rootScope.msgMusic =  new Audio("/assets/music/msg.wav");
            $rootScope.msgMusic.load();
            $rootScope.playMsgMusic = function(){
                $rootScope.msgMusic.startTime = 0;
                $rootScope.msgMusic.play();

                navigator.vibrate = navigator.vibrate ||
                navigator.webkitVibrate ||
                navigator.mozVibrate ||
                navigator.msVibrate;
                navigator.vibrate([1500, 500]);

            };

            $rootScope.stopMsgMusic = function(){
                $rootScope.msgMusic.startTime = 0;
                $rootScope.msgMusic.pause();
            };

            $rootScope.env = env;

            EasemobUtil.conn = new Easemob.im.Connection();

            EasemobUtil.conn.init({
                //当连接成功时的回调方法
                onOpened : function() {

                    EasemobUtil.conn.setPresence();//设置用户上线状态，必须调用
                    EasemobUtil.conn.heartBeat(EasemobUtil.conn);

                    if($state.includes('users.login')){

                        $state.go('messages');

                    }
                },
                //当连接关闭时的回调方法
                onClosed : function() {
                    //handleClosed();
                },
                //收到文本消息时的回调方法
                onTextMessage : function(message) {


                    $rootScope.$broadcast('onTextMessage',message);

                    $rootScope.playMsgMusic();

                    $rootScope.getTotalUnreadMsgNum();
                },
                //收到表情消息时的回调方法
                onEmotionMessage : function(message) {
                    //handleEmotion(message);
                },
                //收到图片消息时的回调方法
                onPictureMessage : function(message) {
                    //handlePictureMessage(message);
                },
                //收到音频消息的回调方法
                onAudioMessage : function(message) {
                    //handleAudioMessage(message);
                },
                //收到位置消息的回调方法
                onLocationMessage : function(message) {
                    //handleLocationMessage(message);
                },
                //收到文件消息的回调方法
                onFileMessage : function(message) {
                    //handleFileMessage(message);
                },
                //收到视频消息的回调方法
                onVideoMessage : function(message) {
                    //handleVideoMessage(message);
                },
                //收到联系人订阅请求的回调方法
                onPresence : function(message) {

                    if (message.type == 'subscribe') {

                        //若e.status中含有[resp:true],则表示为对方同意好友后反向添加自己为好友的消息，demo中发现此类消息，默认同意操作，完成双方互为好友；如果不含有[resp:true]，则表示为正常的对方请求添加自己为好友的申请消息。

                        if ( message.status && message.status.indexOf('resp:true') > -1) {

                            EasemobUtil.subscribed({
                                to : message['from'],
                                message : "[resp:true]"
                            });

                            return;
                        }
                        else{

                            $rootScope.playMsgMusic();
                        }

                        //添加好友申请
                        Friend.apply({
                            'from':message['from'],
                            'type':'search'
                        }).then(function(){

                            $rootScope.$broadcast('onSubscribe',true);
                        });

                        $rootScope.getTotalApplyNum();



                    }
                    //(发送者允许接收者接收他们的出席信息)，即别人同意你加他为好友
                    if (message.type == 'subscribed') {



                    }
                    //（发送者取消订阅另一个实体的出席信息）,即删除现有好友
                    if (message.type == 'unsubscribe') {

                    }
                    //（订阅者的请求被拒绝或以前的订阅被取消），即对方单向的删除了好友
                    if (message.type == 'unsubscribed') {

                    }


                },
                //收到联系人信息的回调方法
                onRoster : function(message) {
                    //handleRoster(message);
                },
                //收到群组邀请时的回调方法
                onInviteMessage : function(message) {
                    //handleInviteMessage(message);
                },
                //异常时的回调方法
                onError : function(e) {

                    var msg = e.msg;


                    if (e.type == EASEMOB_IM_CONNCTION_SERVER_CLOSE_ERROR) {
                        if (msg == "" || msg == 'unknown' ) {
                            Notification.error("服务器断开连接,可能是因为在别处登录");
                            $rootScope.logout();
                        } else {
                            Notification.error("服务器断开连接");
                            $rootScope.logout();
                        }
                    } else if (e.type === EASEMOB_IM_CONNCTION_SERVER_ERROR) {
                        if (msg.toLowerCase().indexOf("user removed") != -1) {
                            Notification.error("用户已经在管理后台删除");
                            $rootScope.logout();
                        }
                    } else {
                        if(msg.indexOf('连接还未建立') >= 0){

                            Notification.info("您的账号已在别处登录！");
                            $rootScope.logout();

                        }else{
                            Notification.error(msg);
                        }

                    }


                }
            });

            $rootScope.logout = function(){

                $state.go('users.login');
                EasemobUtil.conn.stopHeartBeat(EasemobUtil.conn);
                EasemobUtil.conn.clear();
                EasemobUtil.conn.onClosed();
            }

            //获取登录的用户信息
            function getUserInfo() {

                if ($auth.isAuthenticated() === true) {

                    Customer.getUserInfo().then(function (data) {

                        setTimeout(function(){

                            UserService.setUser(data);

                            $rootScope.$broadcast('setUser', UserService.getUser());

                        },100);

                        $auth.setToken(data.meta.token);

                        EasemobUtil.login(data.easemob_username, data.easemob_password);

                    });

                }

            }

            //获取定位信息
            $rootScope.setLocation = function(callback,error){

                LocationService.clear();

                var geolocation = new BMap.Geolocation();

                geolocation.getCurrentPosition(function(r){

                    if(this.getStatus() == BMAP_STATUS_SUCCESS){

                        LocationService.point = {
                            lng: r.point.lng,
                            lat: r.point.lat
                        };

                        Customer.setLocation({

                            lat:r.point.lat,
                            lng:r.point.lng

                        }).then(function(){

                            UserService.user.lat = r.point.lat;
                            UserService.user.lng = r.point.lng;

                        });

                        //回调坐标位置
                        callback(LocationService.point);

                        var myGeo = new BMap.Geocoder();

                        myGeo.getLocation(new BMap.Point(r.point.lng,r.point.lat), function(rs){

                            var addComp = rs.addressComponents;
                            console.info(addComp)

                            LocationService.location = {
                                'province':addComp.province,
                                'city':addComp.city,
                                'district':addComp.district,
                                'street':addComp.street,
                                'streetNumber':addComp.streetNumber
                            };

                            $rootScope.$broadcast('onBMapLocation',true);
                        });

                    }
                    else {

                        LocationService.status = this.getStatus();

                        //回调错误
                        errorCallback(LocationService.status)
                    }


                });

            };

            //获取登录的用户信息
            getUserInfo();

            //路由监听
            //权限控制
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {

                //if(!Utils.isMobile()){
                //
                //    return $state.go('users.browser');
                //}

                if(toState.access === false){

                    $rootScope.getTotalApplyNum();

                    $rootScope.getTotalUnreadMsgNum();

                    $rootScope.setLocation(function(){ },function(){ });

                }

                //路由中access=true的不需要检查是否已登录
                if (toState.access === false && $auth.isAuthenticated() === false) {
                //if(toState.access === false  && !EasemobUtil.conn.isOpened()){

                    event.preventDefault();

                    return $state.go('users.login');

                }


            });

        });
})();
