angular.module('membershipManagementServices', ['ngResource'])

    .factory('Card', ['$resource', '$http', 'User', function ($resource, $http, User) {
        var cardsUrl = '/api/v1/cards';

        var Card = $resource(cardsUrl + '/:cardId', {}, { //TODO pagination
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.cards;
                }
            },
            'byCode': {
                method: 'GET',
                url: '/api/v1/cards/search/findByCode'
            },
            'byOwner': {
                method: 'GET',
                url: '/api/v1/cards/search/findByOwner',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.cards;
                }
            }
        });

        Card.create = function (card, successCallback, errorCallback) {
            var newCard = {
                code: card.code,
                issueTimestamp: new Date(),
                owner: card.owner,
                staffMember: User.getLogged()._links.self.href
            };

            $http.post(cardsUrl, newCard).then(function (response) {
                if (successCallback) {
                    successCallback(response);
                }
            }, function (response) {
                if (errorCallback) {
                    errorCallback(response);
                }
            });
        };

        return Card;
    }])

    .factory('Payments', ['$resource', function ($resource) {
        var paymentsUrl = '/api/v1/payments';

        var Payments = $resource(paymentsUrl + '/:paymentId', {}, {
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.payments;
                }
            },
            'byPayer': {
                method: 'GET',
                isArray: true,
                url: paymentsUrl + '/search/findByPayerOrderByTimestampDesc',
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.payments;
                }
            }
        });

        return Payments;
    }])

    .factory('Customers', ['$resource', '$http', 'User', function ($resource, $http, User) {
        var customersUrl = '/api/v1/customers';

        var Customers = $resource(customersUrl + '/:customerId', {}, { //TODO pagination
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.customers;
                }
            },
            'byFirstNameAndLastName': {
                method: 'GET',
                isArray: true,
                url: '/api/v1/customers/search/findByFirstNameAndLastNameAllIgnoreCase',
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.customers;
                }
            }
        });

        Customers.create = function (customer, successCallback, errorCallback) {
            //TODO use customer.card to create new card

            var newCustomer = {
                firstName: customer.firstName,
                lastName: customer.lastName,
                staffMember: User.getLogged()._links.self.href
            };

            $http.post(customersUrl, newCustomer).then(function (response) {
                //TODO use response to update sidemenu list
                if (successCallback) {
                    successCallback(response);
                }
            }, function (response) {
                if (errorCallback) {
                    errorCallback(response);
                }
            });
        };

        Customers.resourceUrlToProfileUrl = function (resourceUrl) {
            return '/customers/' + resourceUrl.split('/').pop();
        };

        Customers.customerProfileUrl = function (customer) {
            return Customers.resourceUrlToProfileUrl(customer._links.self.href);
        };

        return Customers;
    }])

    .factory('CheckIn', ['$resource', function ($resource) {
        return $resource('/api/v1/checkIns/:checkInId', {}, {
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.checkIns;
                }
            },
            'byCardOwner': {
                method: 'GET',
                isArray: true,
                url: '/api/v1/checkIns/search/findByCardOwnerOrderByTimestampDesc',
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.checkIns;
                }
            }
        });
    }])

    .factory('Memberships', ['$resource', function ($resource) {
        var membershipsUrl = '/api/v1/memberships';

        var Memberships = $resource(membershipsUrl + '/:membershipId', {}, { //TODO pagination
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.memberships;
                    return angular.fromJson(data)._embedded.memberships;
                }
            }
        });

        return Memberships;
    }])

    .factory('Groups', ['$resource', function ($resource) {
        var groupsUrl = '/api/v1/trainingGroups';

        return $resource(groupsUrl + '/:groupId', {}, {
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.trainingGroups;
                }
            }
        });
    }])

    .factory('User', ['$http', '$log', function ($http, $log) {
        var usersUrl = '/api/v1/users';
        var all = [];
        var logged = {};

        $http.get(usersUrl).then(function (response) {
            all.push.apply(all, response.data._embedded.users);
            if (all.length === 0) {
                $log.error('There are no users in the database');
            }
            logged = all[0];
        });

        return User = {
            getAll: function () {
                return all;
            },
            getLogged: function () {
                return logged;
            },
            setLogged: function (user) {
                logged = user;
            }
        };
    }])

    .service('SidebarCustomerList', function (Customers) {
        this.customers = Customers.query({projection: 'firstNameAndLastNameAndCards'});
        var that = this;
        this.update = function () {
            Customers.query({projection: 'firstNameAndLastNameAndCards'}, function (customers) {
                that.customers.length = 0;
                for (var i = 0; i < customers.length; i++) {
                    that.customers.push(customers[i]);
                }
            });
            console.log(that.customers);
        }
    });