(function () {

    'use strict';

    angular.module('yiqichat')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('friends', {
                    parent: 'main',
                    url: '/friends',
                    controller: 'FriendController@list',
                    templateUrl: 'app/friends/views/list.html',
                    access: true
                })
                .state('friends.add', {
                    url: '/add',
                    views: {
                        '@main': {
                            controller: 'FriendController@add',
                            templateUrl: 'app/friends/views/search.html'
                        }
                    },
                    access: false
                })
                .state('friends.setRemark', {
                    url: '/{id}/setRemark',
                    views: {
                        '@main': {
                            controller: 'FriendController@setRemark',
                            templateUrl: 'app/friends/views/setRemark.html'
                        }
                    },
                    access: false
                })

        }]);
})();
