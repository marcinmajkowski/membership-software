(function () {
    'use strict';

    angular
        .module('customers')
        .factory('customersService', CustomersService);

    CustomersService.$inject = ['$http', 'apiUrl'];

    function CustomersService($http, apiUrl) {
        var customersUrl = apiUrl + '/customers';
        var customers = [];
        var selectedCustomer = null;

        var service = {
            createCustomer: createCustomer,
            deleteCustomer: deleteCustomer,
            customers: customers,
            selectedCustomer: selectedCustomer
        };

        activate();

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            loadCustomers();
        }

        function loadCustomers() {
            return $http.get(customersUrl).then(function (response) {
                service.customers = response.data._embedded.customers;
                return service.customers;
            });
        }

        function createCustomer(customer) {
            return $http.post(customersUrl, customer).then(function (response) {
                var newCustomer = response.data;
                service.customers.push(newCustomer);
                return newCustomer;
            });
        }

        function deleteCustomer(customer) {
            return $http.delete(customer._links.self.href).then(function () {
                // Remove customer from local list, no need to load whole list again
                var index = service.customers.indexOf(customer);
                if (index > -1) {
                    service.customers.splice(index, 1);
                }
            });
        }

    }

})();
