(function () {

    'use strict';

    angular.module('yiqichat')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('messages', {
                    parent: 'main',
                    url: '/messages',
                    views: {
                        '@main': {
                            controller: 'MessageController@list',
                            templateUrl: 'app/messages/views/list.html'
                        }
                    },
                    access: false
                })
                .state('messages.detail', {
                    url: '/{id}/detail',
                    views: {
                        '@main': {
                            controller: 'MessageController@detail',
                            templateUrl: 'app/messages/views/detail.html'
                        }
                    },
                    access: false
                });

        }]);
})();
