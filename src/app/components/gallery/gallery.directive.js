(function () {
    'use strict';
    angular.module("yiqichat")
        //图片墙
        .directive("gallery", function () {
            return {
                restrict: "A",
                require: '?ngModel',
                scope: {
                    images: '=ngModel'
                },
                templateUrl: 'app/components/gallery/views/gallery.html',
                controller: 'GalleryController'
            };
        })

        .controller('GalleryController', function ($scope, $modal) {

            var size = $scope.size = $scope.images.length ;

            $scope.cur = $scope.previous = $scope.next = 0;

            $scope.openPreview = false;

            $scope.currentImage = null;

            $scope.openPreviewWindow = function(index){


                $scope.openPreview = true;
                $scope.cur = index >= size ? size - 1 : index;
                $scope.cur = index < 0 ? 0 : index;
                $scope.previous =  ($scope.cur - 1) < 0 ? size-1 : ($scope.cur - 1);
                $scope.next =  ($scope.cur + 1) >= size ? size-1 : $scope.cur + 1;

            };

            $scope.closePreviewWindow = function(){

                $scope.openPreview = false;

            };

        })



})();



