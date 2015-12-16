angular.module('membershipManagementApp', [
        'ngRoute',
        'AngularStompDK',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'membershipManagementControllers',
        'membershipManagementDirectives',
        'membershipManagementServices'
    ])

    .config(['$routeProvider', 'ngstompProvider',
        function ($routeProvider, ngstompProvider) {
            $routeProvider.
            when('/check-in', {
                templateUrl: 'partials/check-in.html',
                controller: 'CheckInCtrl'
            }).
            when('/payment', {
                templateUrl: 'partials/payment.html',
                controller: 'PaymentCtrl'
            }).
            when('/card', {
                templateUrl: 'partials/card.html'
            }).
            when('/people', {
                templateUrl: 'partials/people.html',
                controller: 'PeopleCtrl'
            }).
            when('/membership', {
                templateUrl: 'partials/membership.html'
            }).
            when('/statistics', {
                templateUrl: 'partials/statistics.html'
            }).
            when('/settings', {
                templateUrl: 'partials/settings.html'
            }).
            otherwise({
                redirectTo: '/check-in'
            });

            ngstompProvider
                .url('/front-endpoint')
                .class(SockJS);
        }])

    .run(function (ngstomp, $rootScope, $interval) {
        var webSocketEndPoint = '/scanner/check-in';

        function whatToDoWhenMessageComing(message) {
            $rootScope.$broadcast('scanEvent', message);
        }

        ngstomp.subscribe(webSocketEndPoint, whatToDoWhenMessageComing);

        //FIXME use real hearbeat
        //TODO add reconnection
        $interval(function () {
            $rootScope.$broadcast('stompConnectionStatusEvent', ngstomp.stompClient.connected);
        }, 1000);
    });