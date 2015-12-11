var membershipManagementApp = angular.module('membershipManagementApp', [
    'AngularStompDK',
    'ui.bootstrap',
    'ui.bootstrap.tpls'
]);

membershipManagementApp.config(function(ngstompProvider) {
   ngstompProvider
       .url('/front-endpoint')
       .class(SockJS);
});

membershipManagementApp.controller('IndexCtrl', function ($scope, ngstomp) {
    $scope.message = {
        'number': '-'
    }

    var webSocketEndPoint = '/scanner/check-in';
    var items = [];

    ngstomp.subscribe(webSocketEndPoint, whatToDoWhenMessageComing);

    function whatToDoWhenMessageComing(message) {
        $scope.message = angular.fromJson(angular.fromJson(message.body));
        $scope.addAlert($scope.message.number);
    }

    $scope.alerts = [];

    $scope.addAlert = function(message) {
        $scope.alerts.push({type: message === '000000001519' ? 'success' : 'danger', msg: 'Code: ' + message});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(-index - 1, 1);
    };
});