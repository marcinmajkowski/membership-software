(function () {
    'use strict';

    angular
        .module('payments')
        .controller('CustomerNewPaymentDialogController', CustomerNewPaymentDialogController);

    CustomerNewPaymentDialogController.$inject = ['$mdDialog'];

    function CustomerNewPaymentDialogController($mdDialog) {
        var vm = this;

        vm.save = $mdDialog.hide;
        vm.cancel = $mdDialog.cancel;
        vm.userInput = {};

        // *********************************
        // Internal methods
        // *********************************

        //TODO submit user input on enter key
        //TODO validation
    }

})();