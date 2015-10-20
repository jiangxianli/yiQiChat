(function () {
    'use strict';
    angular.module('yiqichat')
        .factory('Image', function (Restangular) {

            var service = Restangular.service('image');



            return service;
        });
})();
