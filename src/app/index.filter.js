(function () {
    'use strict';
    angular.module('yiqichat')
        //不转义html
        .filter('to_trusted', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        })
        .filter('date_from_string', function () {
            return function (text) {
                return text ? text.split(' ')[0] : '_ _';
            };
        })
        .filter('distance', function () {
            return function (one,two) {

                if(one.lat && one.lng && two.lat && two.lng){

                    var distance = parseInt(getDistance(one.lat,one.lng,two.lat,two.lng));

                    if(distance < 0){

                        return '来自火星';
                    }

                    if(distance <= 50){ return distance+'米内' }
                    else if(distance <= 100){ return '100米内'}
                    else if(distance <= 200){ return '200米内'}
                    else if(distance <= 300){ return '300米内'}
                    else if(distance <= 400){ return '400米内'}
                    else if(distance <= 500){ return '500米内'}
                    else if(distance <= 1000){ return '1公里内'}
                    else if(distance <= 2000){ return '2公里内'}
                    else if(distance <= 3000){ return '3公里内'}
                    else if(distance > 3000){ return parseInt(distance/1000)+'公里'}
                }
                if(!distance){

                    return '来自火星';
                }


                function getDistance(lat1,lng1,lat2,lng2){

                    var map = new BMap.Map("allmap");
                    var pointA = new BMap.Point(lng1,lat1);  // 创建点坐标A
                    var pointB = new BMap.Point(lng2,lat2);  // 创建点坐标B

                    return map.getDistance(pointA,pointB).toFixed(2) ;

                }
            };
        })
        .filter('format_date',function(){
            return function (data){

                    var date1 = new Date(data.date.substr(0,19).replace(/-/g, "/")); //begintime 为开始时间
                    //var date1=new Date();  //开始时间
                    var date2=new Date();    //结束时间

                    var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数

                    //计算出相差天数
                    var days=Math.floor(date3/(24*3600*1000))

                    //计算出小时数
                    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
                    var hours=Math.floor(leave1/(3600*1000))
                    //计算相差分钟数
                    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                    var minutes=Math.floor(leave2/(60*1000))
                    //计算相差秒数
                    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                    var seconds=Math.round(leave3/1000)

                    if(days > 0 && days <= 3) return days + '天前' ;
                    else if(hours > 0 ){
                        return hours + '小时前';
                    }else if(minutes > 0){
                        return minutes + '分钟前'
                    }else{
                        return '刚刚';
                    }

            }
        })

})();
