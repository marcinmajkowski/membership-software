(function () {
    'use strict';

    angular
        .module('payments')
        .controller('CustomerPaymentsListController', CustomerPaymentsListController);

    CustomerPaymentsListController.$inject = ['paymentsService'];

    function CustomerPaymentsListController(paymentsService) {
        var vm = this;

        vm.payments = [];

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            paymentsService.getPaymentsByCustomer(vm.customer).then(function (payments) {
                vm.payments = [].concat(payments);
            });
        }

    }

})();