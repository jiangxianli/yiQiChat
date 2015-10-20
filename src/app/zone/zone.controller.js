(function (window) {
    'use strict';
    angular.module('yiqichat')

        //个人中心
        .controller('ZoneCtrl@index', function ($scope, Customer, UserService, Notification,$rootScope,$state,$auth) {

            $scope.state = $state;

            $scope.customer = UserService.user;

            $scope.$on('setUser',function(d,data){

                $scope.customer = data

            });

            //退出系统
            $scope.logout = function(){

                $auth.logout();
                $rootScope.logout();
            }

        })

        //附近的人
        .controller('ZoneCtrl@nearby', function ($scope, Customer, UserService, Notification,$rootScope,LocationService) {

            var modal = UIkit.modal(".loadingModal");

            $scope.tipInfo = '搜索中...';

            $scope.customers = [];

            $scope.user = UserService.user;

            $scope.$on('setUser',function(d,data){

                $scope.user = data

            });

            getNearbyCustomers();

            //获取附近的人
            function getNearbyCustomers(){

                $scope.tipInfo = '搜索中...';
                modal.show();

                //定位处理
                $rootScope.setLocation(function(point){

                    Customer.nearby().then(function(data){
                        //距离排序
                        data.sort(sortOrder);

                        modal.hide();
                        $scope.customers = data;
                    });


                },function(error){

                    $scope.tipInfo = '定位失败!';
                    setTimeout(function(){

                        modal.hide();
                    },2000);
                    console.info(error)
                });

                //超时定位失败
                setTimeout(function(){

                    if(modal.isActive()){

                        $scope.tipInfo = '定位失败!';
                        setTimeout(function(){

                            modal.hide();
                        },2000);
                    }

                },10000)


            };

            //根据距离排序
            function sortOrder(a,b){

                var distance_a = UserService.getGreatCircleDistance(a.lat, a.lng, LocationService.point.lat, LocationService.point.lng);

                var distance_b = UserService.getGreatCircleDistance(b.lat, b.lng, LocationService.point.lat, LocationService.point.lng);

                return distance_a >= distance_b;

            }

        })

        //个人信息
        .controller('ZoneCtrl@profile', function ($scope, Customer, UserService, Notification,$rootScope,Upload,env,Utils) {

            $scope.user = UserService.user;

            $scope.$on('setUser',function(d,data){

                $scope.user = data

            });

            var modal = UIkit.modal(".loadingModal");
            var sexModel = UIkit.modal(".sexSelect");

            $scope.tipInfo = '头像上传中...';

            //上传个人头像
            $scope.updateCustImg = function(file){

                if(!file || modal.isActive()) return false;

                //微信中不可上传文件
                if(Utils.isWxBrowser()){
                    Notification.info('微信浏览器暂不支持图片上传功能！')
                    return false;
                }

                modal.show();

                //上传
                Upload.upload({
                    url: env.baseUrl + "/customer/uploadImage",
                    file: file,
                    method: "POST",
                    sendFieldsAs: 'form'
                }).progress(function (evt) {

                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.tipInfo = '已上传'+progressPercentage+'%'


                }).success(function (data, status, headers, config) {
                    modal.hide();
                    UserService.setImageUrl(data.data.url);
                    $scope.user = UserService.user;
                    $scope.tipInfo = '头像上传中...';
                    $scope.file  = {}
                }).error(function (data, status, headers, config) {


                });

            };

            //性别选择框
            $scope.openSexSelect = function(){

                sexModel.show()
            };

            var postData = false;

            //设置性别
            $scope.setSex = function(sex){

                if(postData) return false;
                postData = true;

                Customer.setSex({sex:sex}).then(function(data){
                    $scope.user = data;
                    UserService.user = data
                    sexModel.hide()
                    postData = false;
                })
            }
        })

        //设置昵称
        .controller('ZoneCtrl@profile.username', function ($scope,$state, Customer, UserService, Notification,$rootScope,LocationService) {

            $scope.full = true;
            $scope.user = UserService.user;

            $scope.$on('setUser',function(d,data){

                $scope.user = data

            });

            //设置昵称
            $scope.setUserName = function(){

                if($scope.user.user_name){

                    Customer.setUserName({username:$scope.user.user_name}).then(function(data){

                        UserService.user = data

                        $state.go('zone.profile');

                    })
                }

            }


        })

        //设置简介
        .controller('ZoneCtrl@profile.intro', function ($scope, Customer, UserService, Notification,$rootScope,LocationService,$state) {

            $scope.full = true;
            $scope.user = UserService.user;

            $scope.$on('setUser',function(d,data){

                $scope.user = data

            });

            //设置个人简介
            $scope.setIntro = function(){

                if($scope.user.intro){

                    Customer.setIntro({intro:$scope.user.intro}).then(function(data){

                        UserService.user = data

                        $state.go('zone.profile');

                    })
                }

            }


        })

        //设置地址
        .controller('ZoneCtrl@profile.address', function ($scope, Customer, UserService, Notification,$rootScope,LocationService,AddressService,$state) {

            $scope.addresses = AddressService.data;

            $scope.provinces  = AddressService.provinces;

            $scope.cities = [];

            $scope.address = {};
            $scope.address.street = '';


            $scope.location = "定位中..."

            //定位监听
            $scope.$on('onBMapLocation',function(){

                $scope.location = LocationService.location.province+" "+LocationService.location.city

            });

            //使用当前定位信息
            $scope.setMapLocation = function(){

                if(LocationService.location != null){

                    $scope.address.province = LocationService.location.province;
                    $scope.setAddress(LocationService.location.city);
                }

            };

            //获取城市列表
            $scope.getCitys = function(province){

                var flag = false;

                $scope.address.province = province;

                _.forEach($scope.addresses,function(item){


                    if(!flag && item.name == province){

                        $scope.cities = item.cities;
                        flag = true;
                    }

                })
            };

            //设置位置
            $scope.setAddress = function(city){

                $scope.address.city = city;

                Customer.setAddress($scope.address).then(function(data){

                    UserService.user = data;

                    $state.go('zone.profile');
                })

            };

        })

        //二维码
        .controller('ZoneCtrl@profile.qrcode', function ($scope,$state, Customer, UserService, Notification,$rootScope,LocationService) {

            $scope.user = UserService.user;

            $scope.$on('setUser',function(d,data){

                $scope.user = data

            });

            //创建二维码
            Customer.createQrcode().then(function(data){

                UserService.user = data;
                $scope.user = data
            })
        })

        //发表心情
        .controller('ZoneCtrl@mood.create', function ($scope,$state, Customer, UserService, Notification,$rootScope,Upload,env,Mood,Utils) {

            $scope.user = UserService.user;

            $scope.$on('setUser',function(d,data){

                $scope.user = data

            });

            $scope.mood = {}
            $scope.mood.content = '';
            $scope.mood.location = '';
            $scope.mood.hidden = false;
            $scope.mood.images = [];

            $scope.images = [];

            //上传心情图片
            $scope.uploadImg = function(file){

                if(!file) return false;

                if(Utils.isWxBrowser()){
                    Notification.info('微信浏览器暂不支持图片上传功能！')
                    return false;
                }

                if($scope.images.length >= 6){

                    Notification.info('最多可上传6张图片！')

                    return false;
                }

                Upload.upload({
                    url: env.baseUrl + "/mood/uploadImage",
                    file: file,
                    method: "POST",
                    sendFieldsAs: 'form'
                }).progress(function (evt) {

                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //$scope.tipInfo = '已上传'+progressPercentage+'%'


                }).success(function (data, status, headers, config) {

                    $scope.images.push(data.data);

                }).error(function (data, status, headers, config) {


                });

            };

            //发表心情
            $scope.create = function(){

                _.forEach($scope.images,function(item){
                    $scope.mood.images.push(item.id);
                });

                Mood.create($scope.mood).then(function(){

                    $state.go('moods')
                })

            };

            //设置定位
            $scope.setLocation = function(){

                var geolocation = new BMap.Geolocation();

                geolocation.getCurrentPosition(function(r){

                    if(this.getStatus() == BMAP_STATUS_SUCCESS){

                        var myGeo = new BMap.Geocoder();

                        myGeo.getLocation(new BMap.Point(r.point.lng,r.point.lat), function(rs){

                            var addComp = rs.addressComponents;

                            $scope.mood.location = addComp.province +addComp.city +addComp.district ;
                        });

                    }
                    else {

                        Notification.error('定位失败')
                    }


                });
            }


        })
})();
