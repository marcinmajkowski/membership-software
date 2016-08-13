(function () {
    'use strict';

    angular
        .module('customers')
        .factory('customersService', CustomersService);

    CustomersService.$inject = ['$http', 'apiUrl'];

    function CustomersService($http, apiUrl) {
        var customersUrl = apiUrl + '/customers';

        var service = {
            getCustomers: getCustomers
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function getCustomers() {
            return $http.get(customersUrl).then(function (response) {
                return response.data._embedded.customers;
            });
        }

    }

})();
