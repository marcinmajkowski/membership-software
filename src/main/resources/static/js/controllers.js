var membershipManagementControllers = angular.module('membershipManagementControllers', []);

membershipManagementControllers.controller('IndexCtrl', function ($scope, ngstomp) {
    $scope.menuVisible = true;
    $scope.stompConnectionStatus = true;

    $scope.$on('stompConnectionStatusEvent', function (event, status) {
       $scope.stompConnectionStatus = status;
    });
});

membershipManagementControllers.controller('CheckInCtrl', function ($scope, $http) {
    $scope.message = {
        'number': '-'
    };

    var items = [];

    function whatToDoWhenMessageComing(event, message) {
        $scope.message = angular.fromJson(message.body);
        $scope.addAlert($scope.message);

        $http.get('api/v1/checkIns').success(function (data) {
            console.log(data);
            $http.get(data._links.last.href).success(function (data) {
                console.log(data);
            });
        });

        $scope.code = $scope.message;

        $http.get('api/v1/cards/search/findByCode?code=' + $scope.message).then(function (response) {
            $http.get(response.data._links.owner.href).then(function (response) {
                $scope.firstName = response.data.firstName;
                $scope.lastName = response.data.lastName;
                $scope.fullName = response.data.firstName + ' ' + response.data.lastName;
            }, function (error) {
                $scope.fullName = null;
            });
        }, function (error) {
            $scope.fullName = null;
        });
    }

    $scope.$on('scanEvent', whatToDoWhenMessageComing);

    $scope.alerts = [];

    $scope.addAlert = function (message) {
        $scope.alerts.push({type: message === '000000001519' ? 'success' : 'danger', msg: message});
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(-index - 1, 1);
    };
});

membershipManagementControllers.controller('PaymentCtrl', function ($scope) {
    $scope.payment = 'to be done';
});