var membershipManagementApp = angular.module('membershipManagementApp', [
    'AngularStompDK',
    'ui.bootstrap',
    'ui.bootstrap.tpls'
]);

membershipManagementApp.run(function(ngstomp, $rootScope) {
    var webSocketEndPoint = '/scanner/check-in';

    function whatToDoWhenMessageComing(message) {
        $rootScope.$broadcast('scanEvent', message);
    }

    ngstomp.subscribe(webSocketEndPoint, whatToDoWhenMessageComing);
});

membershipManagementApp.config(function(ngstompProvider) {
   ngstompProvider
       .url('/front-endpoint')
       .class(SockJS);
});

membershipManagementApp.controller('IndexCtrl', function ($scope) {
    $scope.message = {
        'number': '-'
    }

    var items = [];

    function whatToDoWhenMessageComing(event, message) {
        $scope.message = angular.fromJson(angular.fromJson(message.body));
        $scope.addAlert($scope.message.number);
    }

    $scope.$on('scanEvent', whatToDoWhenMessageComing);

    $scope.alerts = [];

    $scope.addAlert = function(message) {
        $scope.alerts.push({type: message === '000000001519' ? 'success' : 'danger', msg: 'Code: ' + message});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(-index - 1, 1);
    };

    $scope.menuVisible = true;
});