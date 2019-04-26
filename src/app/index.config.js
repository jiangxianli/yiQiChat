(function () {
    'use strict';
    angular.module('yiqichat')
        .config(function ($translateProvider) {
            $translateProvider.preferredLanguage('zh-CN');
        })

        .config(function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.includeBar = false;
            cfpLoadingBarProvider.latencyThreshold = 500;
            cfpLoadingBarProvider.spinnerTemplate = '<div id="Mc-loading-bar-spinner"><div class="spinner-icon"></div></div>';
            cfpLoadingBarProvider.loadingBarTemplate = '<div id="Mc-loading-bar"><div class="bar"><div class="peg"></div></div></div>';
        })

        .config(function (NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 2000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top',
                replaceMessage: true,
                maxCount: 1
            });
        })

        .config(function (RestangularProvider, env) {
            RestangularProvider.setBaseUrl(env.baseUrl);

            RestangularProvider.setDefaultHeaders({
                'X-Requested-With': 'XMLHttpRequest'
            });

            RestangularProvider.setResponseExtractor(function (response, operation) {
                var extractedData = {};

                if (response.data) {
                    extractedData = response.data;
                }

                _.forEach(response, function (val, key) {
                    if (key !== 'data') {
                        extractedData[key] = val;
                    }
                });

                if (operation === 'getList' && response.meta) {
                    extractedData.pagination = response.meta.pagination;
                }

                return extractedData;
            });
        })

        //添加拦截器
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('requestInterceptor');
            //$httpProvider.defaults.withCredentials = true;
        });

})();
