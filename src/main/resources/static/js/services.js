angular.module('membershipManagementServices', ['ngResource'])

    .factory('Card', ['$resource', function ($resource) {
        return $resource('/api/v1/cards/:cardId', {}, { //TODO pagination
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
    }])

    .factory('People', ['$resource', '$http', function ($resource, $http) {
        var peopleUrl = '/api/v1/people';

        var People = $resource(peopleUrl + '/:personId', {}, { //TODO pagination
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.people;
                }
            },
            'byFirstNameAndLastName': {
                method: 'GET',
                isArray: true,
                url: '/api/v1/people/search/findByFirstNameAndLastNameAllIgnoreCase',
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.people;
                }
            }
        });

        People.create = function (person, successCallback, errorCallback) {
            //TODO use person.card to create new card

            var newPerson = {
                firstName: person.firstName,
                lastName: person.lastName
            };

            $http.post(peopleUrl, newPerson).then(function (response) {
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

        People.resourceUrlToProfileUrl = function (resourceUrl) {
            return '/people/' + resourceUrl.split('/').pop();
        };

        People.personProfileUrl = function (person) {
            return People.resourceUrlToProfileUrl(person._links.self.href);
        };

        return People;
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

    .service('SidebarPeopleList', function (People) {
        this.people = People.query({projection: 'firstNameAndLastNameAndCards'});
        var that = this;
        this.update = function () {
            People.query({projection: 'firstNameAndLastNameAndCards'}, function (people) {
                that.people.length = 0;
                for (var i = 0; i < people.length; i++) {
                    that.people.push(people[i]);
                }
            });
            console.log(that.people);
        }
    });