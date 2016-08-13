(function () {
    'use strict';

    angular
        .module('customers')
        .controller('CustomerController', CustomerController);

    CustomerController.$inject = ['customersService', '$location'];

    function CustomerController(customersService, $location) {
        var vm = this;

        vm.customersService = customersService;
        vm.deleteCustomer = deleteCustomer;

        // *********************************
        // Internal methods
        // *********************************

        function deleteCustomer(customer) {
            customersService.deleteCustomer(customer).then(function () {
                customersService.selectedCustomer = null;
                $location.path('/');
            });
        }
    }

})();