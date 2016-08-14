(function () {
    'use strict';

    angular
        .module('customers')
        .factory('customersService', customersService);

    customersService.$inject = ['$http', 'apiUrl', 'cardsService'];

    function customersService($http, apiUrl, cardsService) {
        var customersUrl = apiUrl + '/customers';
        var customers = [];
        var selectedCustomer = null;

        var service = {
            createCustomer: createCustomer,
            createCardForCustomerByCode: createCardForCustomerByCode,
            readCustomerDetails: readCustomerDetails,
            updateCustomer: updateCustomer,
            deleteCustomer: deleteCustomer,
            deleteCardForCustomer: deleteCardForCustomer, //TODO seems like it doesn't fit here
            customers: customers,
            selectedCustomer: selectedCustomer
        };

        activate();

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            loadCustomers();
        }

        function loadCustomers() {
            return $http.get(customersUrl + '?projection=firstNameAndLastNameAndCards').then(function (response) {
                service.customers = response.data._embedded.customers;
                return service.customers;
            });
        }

        function createCustomer(customer) {
            return $http.post(customersUrl, customer).then(function (response) {
                var newCustomer = response.data;
                
                // Workaround since service.customers has cards embdedded (unlike regular customer response)
                newCustomer.cards = [];
                
                service.customers.push(newCustomer);
                return newCustomer;
            });
        }

        function createCardForCustomerByCode(customer, code) {
            var cardToCreate = {
                code: code,
                issueTimestamp: new Date(),
                owner: customer._links.self.href
            };

            return cardsService.createCard(cardToCreate).then(function (createdCard) {
                // Update customer in local list, no need to load whole list again
                var index = service.customers.indexOf(customer);
                if (index > -1) {
                    service.customers[index].cards.push({
                        code: createdCard.code,
                        issueTimestamp: createdCard.issueTimestamp
                    });
                }

                return createdCard;
            });
        }

        function readCustomerDetails(customer) {
            return $http.get(customer._links.self.href).then(function (response) {
                var detailedCustomer = response.data;
                return detailedCustomer;
            });
        }

        function updateCustomer(oldCustomer, newCustomer) {
            return $http.patch(oldCustomer._links.self.href, newCustomer).then(function (response) {
                // Update customer in local list, no need to load whole list again
                var updatedCustomer = response.data;
                var index = service.customers.indexOf(oldCustomer);
                if (index > -1) {
                    service.customers[index].firstName = updatedCustomer.firstName;
                    service.customers[index].lastName = updatedCustomer.lastName;
                }

                return updatedCustomer;
            });
        }

        function deleteCustomer(customer) {
            return $http.delete(customer._links.self.href).then(function () {
                // Remove customer from local list, no need to load whole list again
                var index = service.customers.indexOf(customer);
                if (index > -1) {
                    service.customers.splice(index, 1);
                }
            });
        }

        function deleteCardForCustomer(customer, card) {
            return cardsService.deleteCard(card).then(function () {
                // Remove card from local customers list, no need to load whole list again
                var index = service.customers.indexOf(customer);
                if (index > -1) {
                    var cards = service.customers[index].cards;
                    for (var i = 0, len = cards.length; i < len; i++) {
                        if (cards[i].code == card.code) {
                            cards.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        }

    }

})();
