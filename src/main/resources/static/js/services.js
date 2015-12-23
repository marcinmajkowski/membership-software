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
                url: '/api/v1/cards/search/findByCode',
                params: {
                    projection: 'cardProjection'
                }
            }
        });
    }])

    .factory('People', ['$resource', function ($resource) {
        return $resource('/api/v1/people/:personId', {}, { //TODO pagination
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
    }])

    .factory('CheckIn', ['$resource', function ($resource) {
        return $resource('/api/v1/checkIns/:checkInId', {}, {
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    return angular.fromJson(data)._embedded.checkIns;
                }
            }
        })
    }]);