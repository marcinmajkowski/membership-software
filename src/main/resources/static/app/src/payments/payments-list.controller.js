(function () {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentsListController', PaymentsListController);

    PaymentsListController.$inject = ['paymentsService'];

    function PaymentsListController(paymentsService) {
        var vm = this;

        vm.payments = [];

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            paymentsService.getPayments().then(function (payments) {
                vm.payments = [].concat(payments);
            });
        }

    }

})();