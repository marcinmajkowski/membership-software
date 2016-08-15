(function () {
    'use strict';

    angular
        .module('membershipSoftwareRoute', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/payments', {
                    templateUrl: 'src/payments/view/payments.html',
                    controller: 'PaymentsController',
                    controllerAs: 'vm'
                })
                .when('/check-ins', {
                    templateUrl: 'src/check-ins/view/check-ins.html',
                    controller: 'CheckInsController'
                })
                .when('/customers', {
                    templateUrl: 'src/customers/view/customers.html'
                })
                .when('/customer', {
                    templateUrl: 'src/customers/view/customer.html',
                    controller: 'CustomerController',
                    controllerAs: 'vm'
                })
                .when('/new-customer', {
                    templateUrl: 'src/customers/view/new-customer.html'
                })
                .when('/memberships', {
                    templateUrl: 'src/memberships/view/memberships.html',
                    controller: 'MembershipsController',
                    controllerAs: 'vm'
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