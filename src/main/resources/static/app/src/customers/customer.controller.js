(function () {
    'use strict';

    angular
        .module('customers')
        .controller('CustomerController', CustomerController);

    CustomerController.$inject = ['customersService', '$location'];

    function CustomerController(customersService, $location) {
        var vm = this;

        vm.customersService = customersService;
        vm.updateCustomer = updateCustomer;
        vm.deleteCustomer = deleteCustomer;
        vm.customer = null;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            // Shouldn't' be accessed when no customer selected
            if (customersService.selectedCustomer === null) {
                $location.path('/');
                return;
            }

            // Load customer details (customer from list contains only firstName, lastName and card codes)
            customersService.readCustomerDetails(customersService.selectedCustomer).then(function (customer) {
                vm.customer = customer;
            });
        }

        function updateCustomer(oldCustomer, newCustomer) {
            customersService.updateCustomer(oldCustomer, newCustomer).then(function () {
                console.log('TODO report update success');
            });
        }

        function deleteCustomer(customer) {
            customersService.deleteCustomer(customer).then(function () {
                customersService.selectedCustomer = null;
                $location.path('/');
            });
        }
    }

})();