(function () {

    'use strict';

    angular.module('yiqichat')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('moods', {
                    parent: 'main',
                    url: '/moods',
                    views: {
                        '@main': {
                            controller: 'MoodController@index',
                            templateUrl: 'app/moods/views/index.html'
                        }
                    },
                    access: true
                })
                .state('moods.detail', {
                    url: '/{uuid}/detail',
                    views: {
                        '@main': {
                            controller: 'MoodController@detail',
                            templateUrl: 'app/moods/views/detail.html'
                        }
                    },
                    access: true
                })



        }]);
})();
