angular.module('membershipManagementControllers', [])

    .controller('IndexCtrl', function ($scope, ngstomp, People, $location, $filter) {
        $scope.stompConnectionStatus = true;

        $scope.performSearch = function () {
            $scope.peopleFiltered = $filter('filter')($scope.people, function (item) {
                var fullName = item.firstName + ' ' + item.lastName;

                // filter by full name
                if (fullName.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1) {
                    return true;
                }

                // filter by card code
                for (var i = 0; i < item.cards.length; i++) {
                    var cardCode = item.cards[i].code;
                    if (cardCode.indexOf($scope.search) !== -1) {
                        return true;
                    }
                }

                return false;
            });

            // load profile for first result
            var person = $scope.peopleFiltered[0];
            if (person) {
                $location.path($scope.profileUrlOf(person));
            }
        };

        $scope.$on('scanEvent', function (event, code) {
            //TODO redirect to profile or to new profile form
        });

        $scope.$on('stompConnectionStatusEvent', function (event, status) {
            $scope.stompConnectionStatus = status;
        });

        $scope.getPersonId = function (person) {
            return person._links.self.href.split('/').pop();
        };

        $scope.isActive = function (url) { //FIXME performance
            return $location.path() === url;
        };

        $scope.profileUrlOf = function (person) {
            return '/people/' + $scope.getPersonId(person);
        };

        var querySidebarPeopleList = function () {
            $scope.people = People.query({projection: 'firstNameAndLastNameAndCards'});
        };

        querySidebarPeopleList();
    })

    .controller('CheckInCtrl', function ($scope, $http, CheckIn, Card) {
        $scope.$on('scanEvent', function (event, code, card) {
            $scope.code = code;

            if (card) {
                $scope.firstName = card.owner.firstName;
                $scope.lastName = card.owner.lastName;
                $scope.fullName = $scope.firstName + ' ' + $scope.lastName;
                //TODO check-in here
            } else {
                $scope.firstName = null;
                $scope.lastName = null;
                $scope.fullName = null;
            }

            $scope.checkIn(card);
        });

        var updateCheckIns = function () {
            //TODO add new checkIn to array on client side
            $scope.checkIns = CheckIn.query({sort: 'timestamp,desc'});
        };

        updateCheckIns();

        $scope.checkIn = function (card) {
            var data = {
                timestamp: Date.now(),
                codeSource: 'SCANNER',
                channel: 'WEB',
                card: card._links.self.href,
                staffMember: 'people/1' //TODO get logged user
            };

            $http.post('api/v1/checkIns', data).then(function (response) {
                console.log(response);
                updateCheckIns();
            });
        };
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

        $scope.getPersonId = function (person) {
            return person._links.self.href.split('/').pop();
        };

        $scope.loadPeople();

        $scope.person = {};

        $scope.add = function (person) {
            People.save(person, $scope.loadPeople);
            //FIXME reload sidebar
        };

        $scope.remove = function (person) {
            $http.delete(person._links.self.href).success($scope.loadPeople);
            //TODO notify when 409: conflict - cannot delete
        };
    }])

    .controller('PersonCtrl', ['$scope', '$routeParams', 'People', 'Card', 'CheckIn', 'Groups', '$http', function ($scope, $routeParams, People, Card, CheckIn, Groups, $http) {
        $scope.editing = false;

        $scope.allGroups = Groups.query();

        $scope.showGroup = function () {
            var selected = [];
            angular.forEach($scope.allGroups, function (group) {
                angular.forEach($scope.person.trainingGroups, function (trainingGroup) {
                   if (trainingGroup === group._links.self.href) {
                       //TODO break loop
                       selected.push(group.name);
                   }
                });
            });
            return selected.length ? selected.join(', ') : '';
        };

        $scope.save = function () {
            $scope.editing = false;
            $http.put($scope.person._links.self.href, $scope.person).then(function (response) {
                $scope.person = response.data;
                if ($scope.person.birthday) {
                    $scope.person.birthday = new Date($scope.person.birthday);
                }
                $http.get($scope.person._links.trainingGroups.href).then(function (response) {
                    $scope.person.trainingGroups = [];
                    angular.forEach(response.data._embedded.trainingGroups, function (trainingGroup) {
                        $scope.person.trainingGroups.push(trainingGroup._links.self.href);
                    });
                });
            });
        };

        $scope.cancel = function () {
            $scope.editing = false;
            //TODO reload user
        };

        $scope.person = People.get({personId: $routeParams.personId}, function (person) {
            $scope.person = person;
            if (person.birthday) {
                $scope.person.birthday = new Date(person.birthday);
            }
            $http.get(person._links.cards.href).then(function (response) {
                $scope.cards = response.data._embedded.cards;
            });
            var owner = person._links.self.href;
            $scope.checkIns = CheckIn.byCardOwner({owner: owner});

            $http.get($scope.person._links.trainingGroups.href).then(function (response) {
                $scope.person.trainingGroups = [];
                angular.forEach(response.data._embedded.trainingGroups, function (trainingGroup) {
                    $scope.person.trainingGroups.push(trainingGroup._links.self.href);
                });
            });
        });
    }])

    .controller('NewPersonCtrl', ['$scope', '$http', '$location', 'People', function ($scope, $http, $location, People) {
        $scope.card = {
            code: null
        };

        $scope.addPerson = function (person) {
            //TODO add card
            People.create(person, function (response) {
                //TODO use resource to page url converter service
                $location.path(People.personProfileUrl(response.data));
            }); //TODO handle errors
        };

        $scope.isCardInUse = false;

        $scope.$on('scanEvent', function (event, code, card) {
            $scope.card.code = code;

            if (card) {
                $scope.card = card;
                console.info(card);
                $http.get(card._links.owner.href).then(function (response) {
                    $scope.cardOwnerProfileUrl = People.personProfileUrl(response.data);
                });
                $scope.isCardInUse = true;
            }
        });
    }])

    .controller('TrainingGroupsCtrl', ['$scope', 'Groups', function ($scope, Groups) {
        $scope.groups = Groups.query();
    }]);