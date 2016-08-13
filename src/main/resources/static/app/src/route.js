(function () {
    'use strict';

    angular
        .module('membershipSoftwareRoute', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/payments', {
                    templateUrl: 'src/payments/view/payments.html',
                    controller: 'PaymentController'
                })
                .when('/check-ins', {
                    templateUrl: 'src/check-ins/view/check-ins.html',
                    controller: 'CheckInController'
                })
                .when('/customers', {
                    templateUrl: 'src/customers/view/customers.html'
                })
                .when('/customer', {
                    templateUrl: 'src/customers/view/customer.html'
                })
                .when('/new-customer', {
                    templateUrl: 'src/customers/view/new-customer.html'
                })                
                .when('/', {
                    templateUrl: 'src/home/view/home.html',
                    controller: 'HomeController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);

})();