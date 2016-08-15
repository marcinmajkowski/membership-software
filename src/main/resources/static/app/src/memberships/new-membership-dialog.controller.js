(function () {
    'use strict';

    angular
        .module('memberships')
        .controller('NewMembershipDialogController', NewMembershipDialogController);

    NewMembershipDialogController.$inject = ['$mdDialog'];

    function NewMembershipDialogController($mdDialog) {
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