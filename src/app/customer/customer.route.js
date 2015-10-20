(function () {
    'use strict';
    angular.module('yiqichat')
        .config(function ($stateProvider) {
            $stateProvider
                .state('loginMall', {
                    url: '/login-mall',
                    controller: 'UserController@loginMall',
                    access: false
                })
                .state('users', {
                    url: '/users',
                    template: '<div class="login-wrapper" ui-view></div>',
                    access: false
                })
                .state('users.login', {
                    url: '/login',
                    controller: 'UserController@login',
                    templateUrl: 'app/customer/views/login.html',
                    access: true
                })

                .state('users.register', {
                    url: '/register',
                    controller: 'UserController@register',
                    templateUrl: 'app/customer/views/register.html',
                    access: true
                })
                .state('customers', {
                    url:'/customers',
                    parent: 'main',
                    access: false
                })
                .state('customers.detail', {
                    url: '/{uuid}/detail',
                    views: {
                        '@main': {
                            controller: 'UserController@detail',
                            templateUrl: 'app/customer/views/detail.html'
                        }
                    },
                    access: true
                })
                .state('users.browser', {
                    url: '/browser',
                    templateUrl: 'app/layout/views/browser.html',
                    access: true
                });
        });
})();
