angular.module('membershipManagementApp', [
        'ngAnimate',
        'AngularStompDK',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'checklist-model',
        'membershipManagementControllers',
        'membershipManagementDirectives',
        'membershipManagementServices',
        'membershipManagementRoute'
    ])

    .config(['ngstompProvider', function (ngstompProvider) {
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