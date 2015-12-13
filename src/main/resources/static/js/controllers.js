var membershipManagementControllers = angular.module('membershipManagementControllers', []);

membershipManagementControllers.controller('IndexCtrl', function ($scope) {
    $scope.menuVisible = true;
});

membershipManagementControllers.controller('CheckInCtrl', function ($scope) {
    $scope.message = {
        'number': '-'
    };

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
});

membershipManagementControllers.controller('PaymentCtrl', function ($scope) {
   $scope.payment = 'to be done';
});