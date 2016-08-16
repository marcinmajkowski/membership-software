(function () {
    'use strict';

    angular
        .module('payments')
        .controller('CustomerPaymentsListController', CustomerPaymentsListController);

    CustomerPaymentsListController.$inject = ['paymentsService', '$mdDialog'];

    function CustomerPaymentsListController(paymentsService, $mdDialog) {
        var vm = this;

        vm.payments = [];
        vm.newPayment = newPayment;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            paymentsService.getPaymentsByCustomer(vm.customer).then(function (payments) {
                vm.payments = [].concat(payments);
            });
        }

        function newPayment(ev) {
            $mdDialog.show({
                targetEvent: ev,
                controller: 'CustomerNewPaymentDialogController',
                templateUrl: 'src/payments/view/customer-new-payment-dialog.html',
                controllerAs: 'vm'
            }).then(function (userInput) {
                var newPayment = {
                    membershipStartDate: userInput.membershipStartDate
                };

                paymentsService.createPaymentFromMembershipForCustomer(newPayment, userInput.membership, vm.customer).then(function (payment) {
                    vm.payments.push(payment);
                });

                //TODO report error
            });
        }

    }

})();