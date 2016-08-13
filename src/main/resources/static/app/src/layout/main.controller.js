(function () {
    'use strict';

    angular
        .module('membershipSoftwareLayout')
        .controller('MainController', MainController);

    MainController.$inject = ['customerService', '$mdSidenav', '$location'];

    function MainController(customerService, $mdSidenav, $location) {
        var vm = this;

        vm.selectedCustomer = null;
        vm.customers = [];
        vm.selectCustomer = selectCustomer;
        vm.toggleList = toggleCustomersList;
        vm.go = go;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            customerService.getCustomers().then(function (customers) {
                vm.customers = customers;
                vm.selectedCustomer = customers[0];
            });
        }

        function selectCustomer(customer) {
            //TODO load complete customer info from service
            vm.selectedCustomer = angular.isNumber(customer) ? vm.customers[customer] : customer;
            $location.path('/customer');
        }

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleCustomersList() {
            $mdSidenav('left').toggle();
        }

        /**
         * Use ng-click="go('/home')" instead of ng-href="#/home".
         * This is workaround for wrongly displayed md-button with href attribute.
         */
        function go(path) {
            $location.path(path);
        }
    }

})();