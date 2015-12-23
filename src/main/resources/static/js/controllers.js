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
        $scope.$on('scanEvent', function (event, code) {
            $scope.code = code;

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
            };
            $http.post('api/v1/checkIns', data).then(function (response) {
                console.log(response);
            });
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

        $scope.$on('scanEvent', function (event, code) {
            $scope.code = code;
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
        $scope.loadPeople = function () {
            $scope.people = People.query();
        };

        $scope.loadPeople();

        $scope.person = {};

        $scope.add = function (person) {
            People.save(person, $scope.loadPeople);
        };

        $scope.remove = function (person) {
            $http.delete(person._links.self.href).success($scope.loadPeople);
            //TODO notify when 409: conflict - cannot delete
        };
    }])

    .controller('CardCtrl', ['$scope', 'Card', 'People', '$http', function ($scope, Card, People, $http) {
        $scope.loadCards = function () {
            $scope.cards = Card.query({}, function (data) {
                for (var i = 0; i < $scope.cards.length; i++) {
                    $scope.cards[i].ownerFullName = $scope.cards[i].owner.firstName + ' ' + $scope.cards[i].owner.lastName;
                }
            });
        };

        $scope.loadCards();

        $scope.remove = function (card) {
            $http.delete(card._links.self.href).success($scope.loadCards);
            //TODO notify when 409: conflict - cannot delete
        };

        $scope.$on('scanEvent', function (event, code) {
            $scope.clear();
            $scope.code = code;
            Card.byCode({code: $scope.code}, function (data) {
                $scope.fullName = data.owner.firstName + ' ' + data.owner.lastName;
            });
            $scope.loadCards();
        });

        $scope.add = function (fullName, code) {
            if (typeof fullName === 'undefined' || typeof code === 'undefined') {
                return;
            }
            var tokens = fullName.split(" ");
            var firstName = tokens.shift();
            var lastName = tokens.join(" ");
            console.log('firstName: ' + firstName);
            console.log('lastName: ' + lastName);
            var people = People.byFirstNameAndLastName({firstName: firstName, lastName: lastName}, function (data) {
                if (data.length === 1) {
                    //TODO ask for confirmation to reuse user
                    var card = {
                        code: code,
                        owner: data[0]._links.self.href,
                        issueTimestamp: new Date()
                    };
                    console.log(card);
                    //TODO save card
                    Card.save(card, function () {
                        $scope.loadCards();
                    });
                } else if (data.length === 0) {
                    //TODO new user need to be created
                    People.save({firstName: firstName, lastName: lastName}, function (data) {
                        console.log(data);
                        //FIXME refactor
                        var card = {
                            code: code,
                            owner: data._links.self.href,
                            issueTimestamp: new Date()
                        };
                        Card.save(card, function () {
                            $scope.loadCards();
                        });
                    });
                } else {
                    //TODO pop-up to select user
                }
            });
        };

        $scope.clear = function () {
            $scope.fullName = '';
            $scope.code = '';
        }
    }]);