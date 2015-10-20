(function () {
    'use strict';
    angular.module('yiqichat')
        .config(function ($authProvider, env) {

            $authProvider.httpInterceptor = true;
            $authProvider.withCredentials = true;
            $authProvider.tokenRoot = null;
            $authProvider.cordova = false;
            $authProvider.baseUrl = env.baseUrl;
            $authProvider.loginUrl = '/login';
            $authProvider.signupUrl = '/auth/signup';
            $authProvider.unlinkUrl = '/auth/unlink/';
            $authProvider.tokenName = 'token';
            $authProvider.tokenPrefix = 'mcshop_web';
            $authProvider.authHeader = 'Authorization';
            $authProvider.authToken = 'Bearer';
            $authProvider.storageType = 'localStorage';

        });
})();

