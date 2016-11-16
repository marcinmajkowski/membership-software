(function () {
    'use strict';

    angular
        .module('memberships')
        .factory('membershipsService', membershipsService);

    membershipsService.$inject = ['$http', 'apiUrl'];

    function membershipsService($http, apiUrl) {
        var membershipsUrl = apiUrl + '/memberships';

        var service = {
            getMemberships: getMemberships,
            createMembership: createMembership,
            deleteMembership: deleteMembership
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function getMemberships() {
            return $http.get(membershipsUrl).then(function (response) {
                return response.data._embedded.memberships;
            });
        }

        function createMembership(membership) {
            return $http.post(membershipsUrl, membership).then(function (response) {
                return response.data;
            });
        }

        function deleteMembership(membership) {
            return $http.delete(membership._links.self.href);
        }

    }

})();
