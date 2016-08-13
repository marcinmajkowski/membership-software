(function () {
    'use strict';

    angular
        .module('customers')
        .controller('NewCustomerDialogController', NewCustomerDialogController);

    NewCustomerDialogController.$inject = ['$mdDialog'];

    function NewCustomerDialogController($mdDialog) {
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