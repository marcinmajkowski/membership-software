(function () {
    'use strict';

    angular
        .module('payments')
        .directive('msCustomerPaymentsList', customerPaymentsList);

    customerPaymentsList.$inject = [];

    function customerPaymentsList() {
        var directive = {
            restrict: "E",
            scope: {
                customer: '=msCustomer'
            },
            link: link,
            templateUrl: "src/payments/view/customer-payments-list.html",
            controller: 'CustomerPaymentsListController',
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        // *********************************
        // Internal methods
        // *********************************

        function link(scope, element, attrs, vm) {
        }
    }

})();