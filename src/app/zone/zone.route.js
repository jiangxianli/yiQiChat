(function () {

    'use strict';

    angular.module('yiqichat')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('zone', {
                    parent: 'main',
                    url: '/zone',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@index',
                            templateUrl: 'app/zone/views/index.html'
                        }
                    },
                    access: false
                })
                .state('zone.nearby', {
                    url: '/nearby',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@nearby',
                            templateUrl: 'app/zone/views/nearby.html'
                        }
                    },
                    access: false
                })
                .state('zone.profile', {
                    url: '/profile',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@profile',
                            templateUrl: 'app/zone/views/profile.html'
                        }
                    },
                    access: false
                })
                .state('zone.profile.username', {
                    url: '/username',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@profile.username',
                            templateUrl: 'app/zone/views/profile/username.html'
                        }
                    },
                    access: false
                })
                .state('zone.profile.intro', {
                    url: '/intro',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@profile.intro',
                            templateUrl: 'app/zone/views/profile/intro.html'
                        }
                    },
                    access: false
                })
                .state('zone.profile.address', {
                    url: '/address',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@profile.address',
                            templateUrl: 'app/zone/views/profile/address.html'
                        }
                    },
                    access: false
                })
                .state('zone.profile.qrcode', {
                    url: '/qrcode',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@profile.qrcode',
                            templateUrl: 'app/zone/views/profile/qrcode.html'
                        }
                    },
                    access: false
                })
                .state('zone.mood', {
                    url: '/mood',
                    //views: {
                    //    '@main': {
                    //        controller: 'ZoneCtrl@profile',
                    //        templateUrl: 'app/zone/views/profile.html'
                    //    }
                    //},
                    access: false
                })
                .state('zone.mood.create', {
                    url: '/create',
                    views: {
                        '@main': {
                            controller: 'ZoneCtrl@mood.create',
                            templateUrl: 'app/zone/views/mood/create.html'
                        }
                    },
                    access: false
                })


        }]);
})();
