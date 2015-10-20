(function (_) {
    'use strict';
    angular.module('yiqichat')

        //广场
        .controller('MoodController@index', function ($scope,Mood) {

            $scope.moods = [];

            getMoodList();

            //心情列表
            function getMoodList(){

                Mood.getList().then(function(data){

                    $scope.moods = data;

                })

            }

            //心情点赞
            $scope.praise = function(mood){

                Mood.praise(mood).then(function(){
                    mood.praise_num = parseInt(mood.praise_num) + 1;
                    mood.is_praised = true;
                })
            }

        })

        //心情详情
        .controller('MoodController@detail', function ($scope,Mood,$stateParams) {

            $scope.mood = {};
            $scope.comments = [];

            $scope.reply = {}
            $scope.reply.content = '';
            $scope.reply_id = 0;
            $scope.reply.father_name = '';
            $scope.reply.mood = {};
            console.info($scope.reply_id)
            if($stateParams.uuid){

                //获取心情详情
                Mood.detail({u_num:$stateParams.uuid}).then(function(data){

                    $scope.mood = data;
                });

                //获取评论列表
                Mood.comments({u_num:$stateParams.uuid}).then(function(data){

                    $scope.comments = data;
                });


            }

            //添加评论
            $scope.addComment = function(mood){

                if(mood.id && $scope.reply.content ){

                    var params = {
                        u_num:mood.u_num,
                        mood_id:mood.id,
                        content:$scope.reply.content,
                        father_id:$scope.reply_id
                    };

                    Mood.addComment(params).then(function(data){

                        mood.comment_num += 1;
                        $scope.comment();
                        $scope.comments.push(data);

                    });

                    $scope.comment();
                }

            };

            //回复评论
            $scope.reply = function(mood,comment){

                //$scope.reply.reply_id = comment.id
                //$scope.reply.father_name = comment.remark
                //$scope.reply.mood = mood


            };

            //点赞
            $scope.praise = function(mood){

                Mood.praise(mood).then(function(){

                    mood.praise_num += 1;
                    mood.is_praised = true;
                })
            };

            //主评论
            $scope.comment = function(){

                $scope.reply.content = '';
                $scope.reply_id = 0;
                $scope.reply.father_name = '';
            }
        })
})(_);
