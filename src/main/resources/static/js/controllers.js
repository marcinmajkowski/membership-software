angular.module('membershipSoftwareControllers', [])

    .controller('IndexCtrl', function ($scope, ngstomp, Customers, User, $location, $filter, SidebarCustomerList) {
        $scope.stompConnectionStatus = true;

        $scope.performSearch = function () {
            $scope.customersFiltered = $filter('filter')($scope.customers, function (item) {
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
            var customer = $scope.customersFiltered[0];
            if (customer) {
                $location.path($scope.profileUrlOf(customer));
            }
        };

        $scope.$on('scanEvent', function (event, code) {
            //TODO redirect to profile or to new profile form
        });

        $scope.$on('stompConnectionStatusEvent', function (event, status) {
            $scope.stompConnectionStatus = status;
        });

        $scope.getCustomerId = function (customer) {
            return customer._links.self.href.split('/').pop();
        };

        $scope.isActive = function (url) { //FIXME performance
            return $location.path() === url;
        };

        $scope.profileUrlOf = function (customer) {
            return '/customers/' + $scope.getCustomerId(customer);
        };

        $scope.customers = SidebarCustomerList.customers;

        $scope.users = User.getAll();

        $scope.getLoggedUser = User.getLogged;

        $scope.setLoggedUser = User.setLogged;

        $scope.userDropdown = {
            isOpen: false
        };

        $scope.settingsDropdown = {
            isOpen: false
        };
    })

    .controller('HomeCtrl', ['$scope', '$location', '$http', 'Customers', 'User', function ($scope, $location, $http, Customers, User) {
        $scope.$on('scanEvent', function (event, code, card) {
            if (!card) {
                // if card with scanned code does not exist,
                // then redirect to a new customer creation form, filled with the code
                $location.path('/new-customer').search({code: code});
            } else {
                // if this code is already registered,
                // then get the owner and redirect to his profile
                $http.get(card._links.owner.href).then(function (response) {
                    $location.path(Customers.customerProfileUrl(response.data));
                });
            }
        });

        $scope.getLoggedUser = User.getLogged;
    }])

    .controller('CheckInCtrl', ['$scope', '$http', 'CheckIn', 'Card', 'Groups', 'User', function ($scope, $http, CheckIn, Card, Groups, User) {
        $scope.card = {
            code: null
        };

        $scope.$on('scanEvent', function (event, code, card, owner) {
            $scope.card.code = code;

            if (card) {
                $scope.owner = owner;
                $scope.checkIn(card, owner, $scope.trainingGroup);
            } else {
                $scope.owner = {
                    firstName: '',
                    lastName: ''
                };
            }

        });

        var updateCheckIns = function () {
            //TODO add new checkIn to array on client side
            $scope.checkIns = CheckIn.query({sort: 'timestamp,desc', projection: 'customerAndTimestampAndTrainingGroup'});
        };

        updateCheckIns();

        $scope.checkIn = function (card, owner, trainingGroup) {
            var data = {
                timestamp: Date.now(),
                card: card._links.self.href,
                customer: owner._links.self.href,
                staffMember: User.getLogged()._links.self.href, //TODO get logged user
                trainingGroup: trainingGroup._links.self.href
            };

            console.info(data);

            $http.post('api/v1/checkIns', data).then(function (response) {
                updateCheckIns();
            });
        };

        $scope.groups = Groups.query();
        $scope.trainingGroup = null;
    }])

    .controller('PaymentsCtrl', ['$scope', '$http', 'Payments', function ($scope, $http, Payments) {
        $scope.payments = Payments.query({sort: 'timestamp,desc', projection: 'payerAndMembershipPriceAndTimestamp'});
    }])

    .controller('CustomersCtrl', ['$scope', 'Customers', '$http', function ($scope, Customers, $http) {
        $scope.loadCustomers = function () {
            $scope.customers = Customers.query();
        };

        $scope.getCustomerId = function (customer) {
            return customer._links.self.href.split('/').pop();
        };

        $scope.loadCustomers();

        $scope.customer = {};

        $scope.add = function (customer) {
            Customers.save(customer, $scope.loadCustomers);
            //FIXME reload sidebar
        };

        $scope.remove = function (customer) {
            $http.delete(customer._links.self.href).success($scope.loadCustomers);
            //TODO notify when 409: conflict - cannot delete
        };
    }])

    .controller('CustomerCtrl', ['SidebarCustomerList', '$scope', '$routeParams', 'Customers', 'Card', 'CheckIn', 'Groups', '$http', '$location', 'Payments', function (SidebarCustomerList, $scope, $routeParams, Customers, Card, CheckIn, Groups, $http, $location, Payments) {
        if ($routeParams.editing) {
            $scope.editing = true;
        } else {
            $scope.editing = false;
        }

        $scope.allGroups = Groups.query();

        $scope.showGroup = function () {
            var selected = [];
            angular.forEach($scope.allGroups, function (group) {
                angular.forEach($scope.customer.trainingGroups, function (trainingGroup) {
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
            $http.put($scope.customer._links.self.href, $scope.customer).then(function (response) {
                SidebarCustomerList.update();
                $scope.customer = response.data;
                if ($scope.customer.birthday) {
                    $scope.customer.birthday = new Date($scope.customer.birthday);
                }
                $http.get($scope.customer._links.trainingGroups.href).then(function (response) {
                    $scope.customer.trainingGroups = [];
                    angular.forEach(response.data._embedded.trainingGroups, function (trainingGroup) {
                        $scope.customer.trainingGroups.push(trainingGroup._links.self.href);
                    });
                });
            });
        };

        $scope.cancel = function () {
            $scope.editing = false;
            //TODO reload user
        };

        $scope.customerId = $routeParams.customerId;

        $scope.customer = Customers.get({customerId: $scope.customerId}, function (customer) {
            $scope.customer = customer;
            if (customer.birthday) {
                $scope.customer.birthday = new Date(customer.birthday);
            }
            $http.get(customer._links.cards.href).then(function (response) {
                $scope.cards = response.data._embedded.cards;
            });
            $scope.checkIns = CheckIn.byCardOwner({owner: customer._links.self.href, projection: "customerAndTimestampAndTrainingGroup"});

            $scope.payments = Payments.byPayer({payer: customer._links.self.href});

            $http.get($scope.customer._links.trainingGroups.href).then(function (response) {
                $scope.customer.trainingGroups = [];
                angular.forEach(response.data._embedded.trainingGroups, function (trainingGroup) {
                    $scope.customer.trainingGroups.push(trainingGroup._links.self.href);
                });
            });
        });

        //TODO code repetition. Move callback function to common place
        $scope.$on('scanEvent', function (event, code, card) {
            if (!card) {
                // if card with scanned code does not exist,
                // then redirect to a new customer creation form, filled with the code
                $location.path('/new-customer').search({code: code});
            } else {
                // if this code is already registered,
                // then get the owner and redirect to his profile
                $http.get(card._links.owner.href).then(function (response) {
                    $location.path(Customers.customerProfileUrl(response.data));
                });
            }
        });
    }])

    .controller('NewCustomerCtrl', ['$scope', '$http', '$location', '$routeParams', 'Customers', 'Card', 'SidebarCustomerList', function ($scope, $http, $location, $routeParams, Customers, Card, SidebarCustomerList) {
        $scope.card = {
            code: $routeParams.code
        };

        $scope.addCustomer = function (customer) {
            Customers.create(customer, function (response) {
                if ($scope.card.code) {
                    $scope.card.owner = response.data._links.self.href;
                    Card.create($scope.card);
                }
                SidebarCustomerList.update();
                $location.path(Customers.customerProfileUrl(response.data)).search({editing: true});
            }); //TODO handle errors
        };

        $scope.isCardInUse = false;

        $scope.$on('scanEvent', function (event, code, card, owner) {
            $scope.card.code = code;

            if (owner) {
                $scope.owner = owner;
                $scope.cardOwnerProfileUrl = Customers.customerProfileUrl(owner);
                $scope.isCardInUse = true;
            }
        });
    }])

    .controller('NewPaymentCtrl', ['$scope', '$http', '$location', '$routeParams', 'Customers', 'Card', 'SidebarCustomerList', 'Memberships', 'Payments', 'User', function ($scope, $http, $location, $routeParams, Customers, Card, SidebarCustomerList, Memberships, Payments, User) {
        $scope.payment = {
            membershipStartDate: new Date()
        };

        if ($routeParams.customer) {
            $scope.customerPredefined = true;
            $scope.customerId = $routeParams.customer;
            $scope.payment.payer = Customers.get({customerId: $scope.customerId});
        } else {
            $scope.customerPredefined = false;
        }

        $scope.memberships = Memberships.query();

        $scope.addPayment = function (payment, membership) {
            var membershipEndDate = new Date(payment.membershipStartDate.valueOf()); //TODO refactor
            membershipEndDate.setDate(membershipEndDate.getDate() + membership.durationInDays - 1);

            var newPayment = {
                timestamp: new Date(),
                membershipStartDate: payment.membershipStartDate,
                membershipEndDate: membershipEndDate,
                membershipName: membership.name,
                membershipPrice: membership.price,
                membershipNumberOfTrainings: membership.numberOfTrainings,
                payer: payment.payer._links.self.href,
                staffMember: User.getLogged()._links.self.href
            };

            Payments.save(newPayment, function (payment) {
                $location.path('/payments').search({});
            });
        };

        $scope.membership = {};

        $scope.$on('scanEvent', function (event, code, card, owner) {
            $scope.card.code = code;

            if (owner) {
                $scope.owner = owner;
                $scope.cardOwnerProfileUrl = Customers.customerProfileUrl(owner);
                $scope.isCardInUse = true;
            }
        });
    }])

    .controller('TrainingGroupsCtrl', ['$scope', 'Groups', function ($scope, Groups) {
        $scope.groups = Groups.query();
    }]);