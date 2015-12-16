angular.module('membershipManagementControllers', [])

    .controller('IndexCtrl', function ($scope, ngstomp) {
        $scope.menuVisible = true;
        $scope.stompConnectionStatus = true;

        $scope.$on('stompConnectionStatusEvent', function (event, status) {
            $scope.stompConnectionStatus = status;
        });
    })

    .controller('CheckInCtrl', function ($scope, $http, CheckIn, Card) {
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
            $scope.checkIns = CheckIn.query({sort: 'timestamp,desc'});
        };

        updateCheckIns();

        $scope.checkIn = function (code) {
            var data = {
                timestamp: Date.now(),
                codeSource: 'SCANNER',
                channel: 'WEB',
                card: 'cards/1',
                staffMember: 'people/1'
            }
            $http.post('api/v1/checkIns', data).then(function (response) {
                console.log(response);
            })
        };

        $scope.card = Card.get({cardId: '1'}, function () {
            console.log($scope.card);
        });
    })

    .controller('PaymentCtrl', function ($scope, $http) {
        $http.get('api/v1/memberships').then(function (response) {
            $scope.memberships = response.data._embedded.memberships;
        }, function (error) {
        });

        $scope.$on('scanEvent', function (event, message) {
            $scope.code = angular.fromJson(message.body);
        });

        $scope.newPayment = function () {
            $scope.payment = {
                channel: 'WEB',
                codeSource: 'SCANNER',
                membershipStartDate: Date.now(),
                timestamp: Date.now(),
                card: null,
                membership: $scope.localMembership,
                staffMember: 'people/1'
            };

            $http.get('api/v1/cards/search/findByCode?code=' + $scope.code).then(function (response) {
                $scope.payment.card = response.data._links.self;
                console.log($scope.payment.card);
                console.log($scope.payment.membership);
                $http.post('api/v1/payments', $scope.payment);
            }, function (error) {
            });
        };
    })

    .controller('PeopleCtrl', ['$scope', 'People', '$http', function ($scope, People, $http) {
        $scope.loadPeopleList = function () {
            $scope.people = People.query();
        };

        $scope.loadPeopleList();

        $scope.person = {};

        $scope.add = function (person) {
            People.save(person, $scope.loadPeopleList);
        };

        $scope.remove = function (person) {
            $http.delete(person._links.person.href).success($scope.loadPeopleList);
            //TODO notify when 409: conflict - cannot delete
        };
    }]);