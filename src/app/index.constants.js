(function () {
    'use strict';
    angular.module('yiqichat')
        .constant('paginationConfig', {
            itemsPerPage: 15,
            boundaryLinks: false,
            directionLinks: true,
            firstText: 'First',
            previousText: 'Previous',
            nextText: 'Next',
            lastText: 'Last',
            rotate: true
        })
        .constant('env', {

            baseUrl: 'http://test.chat.jiangxianli.com/api',
            templatePath: 'app'
        });
})();
