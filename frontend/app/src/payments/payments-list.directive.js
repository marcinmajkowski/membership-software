(function () {
    'use strict';

    angular
        .module('payments')
        .directive('msPaymentsList', paymentsList);

    paymentsList.$inject = [];

    function paymentsList() {
        var directive = {
            restrict: "E",
            scope: {},
            link: link,
            templateUrl: "src/payments/view/payments-list.html",
            controller: 'PaymentsListController',
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