(function () {
    'use strict';

    angular
        .module('customers')
        .controller('CustomerController', CustomerController);

    CustomerController.$inject = ['customersService', 'cardsService', '$location', '$mdDialog'];

    function CustomerController(customersService, cardsService, $location, $mdDialog) {
        var vm = this;

        vm.customersService = customersService;
        vm.updateCustomer = updateCustomer;
        vm.deleteCustomer = deleteCustomer;
        vm.customer = null;
        vm.cards = [];
        vm.newCard = newCard;
        vm.deleteCard = deleteCard;
        vm.editCard = editCard;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            // Shouldn't' be accessed when no customer selected
            if (customersService.selectedCustomer === null) {
                $location.path('/');
                return;
            }

            // Load customer details (customer from list contains only firstName, lastName and card codes)
            customersService.readCustomerDetails(customersService.selectedCustomer).then(function (customer) {
                vm.customer = customer;
            });

            // Load customer cards
            cardsService.readCardsByCustomer(customersService.selectedCustomer).then(function (cards) {
                vm.cards = cards;
            });
        }

        function updateCustomer(oldCustomer, newCustomer) {
            customersService.updateCustomer(oldCustomer, newCustomer).then(function () {
                console.log('TODO report update success');
            });
        }

        function deleteCustomer(customer) {
            customersService.deleteCustomer(customer).then(function () {
                customersService.selectedCustomer = null;
                $location.path('/');
            });
        }

        function newCard(ev, owner) {
            var prompt = $mdDialog.prompt()
                .title('Nowa karta')
                .textContent('Wpisz numer znajdujący się pod kodem kreskowym na karcie.')
                .placeholder('0000000000000')
                .ariaLabel('Numer karty')
                .targetEvent(ev)
                .ok('Zapisz')
                .cancel('Anuluj');

            $mdDialog.show(prompt).then(function (code) {
                customersService.createCardForCustomerByCode(owner, code).then(function (newCard) {
                    vm.cards.push(newCard);
                }, function () {
                    console.log('TODO report card not created error');
                });
            });
        }

        function deleteCard(customer, card) {
            customersService.deleteCardForCustomer(customer, card).then(function () {
                var index = vm.cards.indexOf(card);
                if (index > -1) {
                    vm.cards.splice(index, 1);
                }
            });
        }

        function editCard(card) {
            console.log(card);
            console.log('TODO edit card');
        }
    }

})();