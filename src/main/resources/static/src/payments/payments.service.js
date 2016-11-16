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
            createPaymentFromMembershipForCustomer: createPaymentFromMembershipForCustomer,
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

        function createPaymentFromMembershipForCustomer(payment, membership, customer) {
            //TODO need better api
            var newPayment = {
                timestamp: new Date(),
                membershipStartDate: payment.membershipStartDate,
                membershipEndDate: addDays(payment.membershipStartDate, membership.durationInDays),
                membershipName: membership.name,
                membershipPrice: membership.price,
                membershipNumberOfTrainings: membership.numberOfTrainings,
                payer: customer._links.self.href
            };

            return $http.post(paymentsUrl, newPayment).then(function (response) {
                return response.data;
            });
        }

        function deletePayment(payment) {
            return $http.delete(payment._links.self.href);
        }

        //TODO where should I put stuff like this
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

    }

})();
