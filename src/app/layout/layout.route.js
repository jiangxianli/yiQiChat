(function () {
    'use strict';
    angular.module('yiqichat')
        .config(function ($stateProvider) {
            $stateProvider
                .state('main', {
                    templateUrl: 'app/layout/views/main.html',
                    controller: 'MainController'
                })
        });
})();
