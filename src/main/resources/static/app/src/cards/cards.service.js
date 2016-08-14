(function () {
    'use strict';

    angular
        .module('cards')
        .factory('cardsService', cardsService);

    cardsService.$inject = ['$http', 'apiUrl'];

    function cardsService($http, apiUrl) {
        var cardsUrl = apiUrl + '/cards';

        var service = {
            createCard: createCard,
            readCardsByCustomer: readCardsByCustomer
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function createCard(card) {
            return $http.post(cardsUrl, card).then(function (response) {
                return response.data;
            });
        }

        function readCardsByCustomer(customer) {
            return $http.get(customer._links.cards.href).then(function (response) {
                return response.data._embedded.cards;
            });
        }
    }

})();
