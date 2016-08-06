angular.module('membershipSoftwareRoute', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/check-in', {
                templateUrl: 'partials/check-in.html',
                controller: 'CheckInCtrl'
            })
            .when('/payments', {
                templateUrl: 'partials/payments.html',
                controller: 'PaymentsCtrl'
            })
            .when('/new-payment', {
                templateUrl: 'partials/new-payment.html',
                controller: 'NewPaymentCtrl'
            })
            .when('/customers', {
                templateUrl: 'partials/customers.html',
                controller: 'CustomersCtrl'
            })
            .when('/customers/:customerId', {
                templateUrl: 'partials/customer.html',
                controller: 'CustomerCtrl'
            })
            .when('/new-customer', {
                templateUrl: 'partials/new-customer.html',
                controller: 'NewCustomerCtrl'
            })
            .when('/membership', {
                templateUrl: 'partials/membership.html'
            })
            .when('/training-groups', {
                templateUrl: 'partials/training-groups.html',
                controller: 'TrainingGroupsCtrl'
            })
            .when('/statistics', {
                templateUrl: 'partials/statistics.html'
            })
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);