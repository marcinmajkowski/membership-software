angular.module('membershipManagementControllers', [])

    .controller('IndexCtrl', function ($scope, ngstomp) {
        $scope.menuVisible = true;
        $scope.stompConnectionStatus = true;

        $scope.$on('stompConnectionStatusEvent', function (event, status) {
            $scope.stompConnectionStatus = status;
        });
    })

    .controller('CheckInCtrl', function ($scope, $http) {
        $scope.code = null;
        $scope.firstName = null;
        $scope.lastName = null;
        $scope.fullName = null;

        $scope.$on('scanEvent', function (event, message) {
            $scope.code = angular.fromJson(message.body);

            $http.get('api/v1/cards/search/findByCode?code=' + $scope.code).then(function (response) {
                $http.get(response.data._links.owner.href).then(function (response) {
                    $scope.firstName = response.data.firstName;
                    $scope.lastName = response.data.lastName;
                    $scope.fullName = $scope.firstName + ' ' + $scope.lastName;
                }, function (error) {
                    $scope.fullName = null;
                });
            }, function (error) {
                $scope.firstName = null;
                $scope.lastName = null;
                $scope.fullName = null;
            });
        });
    })

    .controller('PaymentCtrl', function ($scope) {
        $scope.payment = 'to be done';
    });