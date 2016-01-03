angular.module('membershipManagementApp', [
        'ngRoute',
        'ngAnimate',
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
                templateUrl: 'partials/card.html',
                controller: 'CardCtrl'
            }).
            when('/people', {
                templateUrl: 'partials/people.html',
                controller: 'PeopleCtrl'
            }).
            when('/people/:personId', {
                templateUrl: 'partials/person.html',
                controller: 'PersonCtrl'
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
            when('/', {
                templateUrl: 'partials/home.html'
            }).
            otherwise({
                redirectTo: '/'
            });

            ngstompProvider
                .url('/front-endpoint')
                .class(SockJS);
        }])

    .run(function (ngstomp, $rootScope, $interval, Card) {
        var webSocketEndPoint = '/scanner/check-in';

        function whatToDoWhenMessageComing(message) {
            var code = angular.fromJson(message.body);
            Card.byCode({code: code}, function (card) {
                $rootScope.$broadcast('scanEvent', code, card);
            }, function (error) {
                $rootScope.$broadcast('scanEvent', code, null);
            });
        }

        ngstomp.subscribe(webSocketEndPoint, whatToDoWhenMessageComing);

        //FIXME use real hearbeat
        //TODO add reconnection
        $interval(function () {
            $rootScope.$broadcast('stompConnectionStatusEvent', ngstomp.stompClient.connected);
        }, 1000);
    });