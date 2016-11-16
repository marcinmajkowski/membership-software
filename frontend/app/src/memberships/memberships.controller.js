(function () {
    'use strict';

    angular
        .module('memberships')
        .controller('MembershipsController', MembershipsController);

    MembershipsController.$inject = ['membershipsService', '$mdDialog'];

    function MembershipsController(membershipsService, $mdDialog) {
        var vm = this;

        vm.memberships = [];
        vm.newMembership = newMembership;
        vm.editMembership = editMembership;
        vm.deleteMembership = deleteMembership;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            membershipsService.getMemberships().then(function (memberships) {
                vm.memberships = [].concat(memberships);
            });
        }

        function newMembership(ev) {
            $mdDialog.show({
                targetEvent: ev,
                controller: 'NewMembershipDialogController',
                templateUrl: 'src/memberships/view/new-membership-dialog.html',
                controllerAs: 'vm'
            }).then(function (userInput) {
                var newMembership = {
                    name: userInput.name,
                    price: userInput.price,
                    durationInDays: userInput.durationInDays,
                    numberOfTrainings: userInput.isUnlimitedNumberOfTrainings ? -1 : userInput.numberOfTrainings
                };

                membershipsService.createMembership(newMembership).then(function (membership) {
                    vm.memberships.push(membership);
                });

                //TODO report error
            });
        }

        function editMembership(membership) {
            console.log('TODO edit membership');
        }

        function deleteMembership(ev, membership) {
            // TODO delete button should go on the left
            var confirm = $mdDialog.confirm()
                .title('Czy na pewno chcesz usunąć ten karnet?')
                .textContent('Operacji nie będzie się dało odwrócić.')
                .targetEvent(ev)
                .ok('Usuń')
                .cancel('Anuluj');

            $mdDialog.show(confirm).then(function () {
                membershipsService.deleteMembership(membership).then(function () {
                    var index = vm.memberships.indexOf(membership);
                    if (index > -1) {
                        vm.memberships.splice(index, 1);
                    }
                });
            });
        }

    }

})();