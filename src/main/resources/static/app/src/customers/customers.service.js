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
            readCustomerDetails: readCustomerDetails,
            updateCustomer: updateCustomer,
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
            return $http.get(customersUrl + '?projection=firstNameAndLastNameAndCards').then(function (response) {
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

        function readCustomerDetails(customer) {
            return $http.get(customer._links.self.href).then(function (response) {
                var detailedCustomer = response.data;
                return detailedCustomer;
            });
        }

        function updateCustomer(oldCustomer, newCustomer) {
            return $http.patch(oldCustomer._links.self.href, newCustomer).then(function (response) {
                // Update customer in local list, no need to load whole list again
                var updatedCustomer = response.data;
                var index = service.customers.indexOf(oldCustomer)
                if (index > -1) {
                    service.customers[index].firstName = updatedCustomer.firstName;
                    service.customers[index].lastName = updatedCustomer.lastName;
                }

                return updatedCustomer;
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
