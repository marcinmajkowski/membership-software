(function () {
    'use strict';

    angular
        .module('payments')
        .controller('CustomerNewPaymentDialogController', CustomerNewPaymentDialogController);

    CustomerNewPaymentDialogController.$inject = ['$mdDialog', 'membershipsService'];

    function CustomerNewPaymentDialogController($mdDialog, membershipsService) {
        var vm = this;

        vm.save = $mdDialog.hide;
        vm.cancel = $mdDialog.cancel;
        vm.memberships = [];
        vm.userInput = {membershipStartDate: new Date()};

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            membershipsService.getMemberships().then(function (memberships) {
                vm.memberships = [].concat(memberships);
            });
        }

        //TODO submit user input on enter key
        //TODO validation
    }

})();