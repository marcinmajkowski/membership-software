angular.module('membershipManagementControllers', [])

    .controller('IndexCtrl', function ($scope, ngstomp) {
        $scope.menuVisible = true;
        $scope.stompConnectionStatus = true;

        $scope.$on('stompConnectionStatusEvent', function (event, status) {
            $scope.stompConnectionStatus = status;
        });
    })

    .controller('CheckInCtrl', function ($scope, $http) {
        //FIXME this is hell
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

            updateCheckIns();
        });

        var updateCheckIns = function () {
            $http.get('api/v1/checkIns?sort=timestamp,desc').then(function (response) {
                $scope.checkIns = response.data._embedded.checkIns;

                for (var i = 0; i < $scope.checkIns.length; i++) {
                    (function (i) {
                        $http.get($scope.checkIns[i]._links.card.href).then(function (response) {
                            $scope.checkIns[i].code = response.data.code;
                            $http.get(response.data._links.owner.href).then(function (response) {
                                $scope.checkIns[i].firstName = response.data.firstName;
                                $scope.checkIns[i].lastName = response.data.lastName;
                            }, function (error) {
                            })
                        }, function (error) {
                        });
                    })(i);
                }
            }, function (error) {
                $scope.checkIns = null;
            });
        };

        updateCheckIns();
    })

    .controller('PaymentCtrl', function ($scope) {
        $scope.payment = 'to be done';
    });