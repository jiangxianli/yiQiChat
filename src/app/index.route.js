(function () {
    'use strict';
    angular.module('yiqichat')
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/moods');
        });
})();
