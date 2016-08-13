(function () {
    'use strict';

    angular
        .module('membershipSoftwareLayout')
        .controller('MainController', MainController);

    MainController.$inject = ['customersService', '$mdSidenav', '$location', '$mdDialog'];

    function MainController(customersService, $mdSidenav, $location, $mdDialog) {
        var vm = this;

        vm.customersService = customersService;
        vm.selectCustomer = selectCustomer;
        vm.toggleList = toggleCustomersList;
        vm.go = go;
        vm.newCustomer = newCustomer;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
        }

        function selectCustomer(customer) {
            //TODO load complete customer info from service
            customersService.selectedCustomer = angular.isNumber(customer) ? customersService.customers[customer] : customer;
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

        function newCustomer(ev) {
            $mdDialog.show({
                targetEvent: ev,
                controller: 'NewCustomerDialogController',
                templateUrl: 'src/customers/view/new-customer-dialog.html',
                controllerAs: 'vm'
            }).then(function (userInput) {
                console.log('accepted');
                console.log(userInput);

                var newCustomer = {
                    firstName: userInput.firstName,
                    lastName: userInput.lastName
                };

                customersService.createCustomer(newCustomer).then(function (customer) {
                    selectCustomer(customer);
                });

                //TODO report error

                //TODO add card
            });
        }
    }

})();