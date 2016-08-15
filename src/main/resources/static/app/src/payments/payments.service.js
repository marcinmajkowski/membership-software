(function () {
    'use strict';

    angular
        .module('payments')
        .factory('paymentsService', paymentsService);

    paymentsService.$inject = ['$http', 'apiUrl'];

    function paymentsService($http, apiUrl) {
        var paymentsUrl = apiUrl + '/payments';

        var service = {
            getPayments: getPayments,
            getPaymentsByCustomer: getPaymentsByCustomer,
            createPayment: createPayment,
            createPaymentForCustomer: createPaymentForCustomer,
            deletePayment: deletePayment
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function getPayments() {
            return $http.get(paymentsUrl + '?projection=payerAndMembershipPriceAndTimestamp').then(function (response) {
                return response.data._embedded.payments;
            });
        }

        function getPaymentsByCustomer(customer) {
            return $http.get(customer._links.payments.href).then(function (response) {
                return response.data._embedded.payments;
            });
        }

        function createPayment(payment) {
            return $http.post(paymentsUrl, payment).then(function (response) {
                return response.data;
            });
        }

        function createPaymentForCustomer(payment, customer) {
            console.log('TODO create payment for customer');
        }

        function deletePayment(payment) {
            return $http.delete(payment._links.self.href);
        }

    }

})();
