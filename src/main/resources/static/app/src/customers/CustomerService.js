(function () {
    'use strict';

    angular
        .module('customers')
        .factory('customerService', CustomerService);

    CustomerService.$inject = ['$http', 'apiUrl'];

    function CustomerService($http, apiUrl) {
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
