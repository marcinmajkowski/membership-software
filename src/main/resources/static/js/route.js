angular.module('membershipManagementRoute', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/check-in', {
                templateUrl: 'partials/check-in.html',
                controller: 'CheckInCtrl'
            })
            .when('/payment', {
                templateUrl: 'partials/payment.html',
                controller: 'PaymentCtrl'
            })
            .when('/people', {
                templateUrl: 'partials/people.html',
                controller: 'PeopleCtrl'
            })
            .when('/people/:personId', {
                templateUrl: 'partials/person.html',
                controller: 'PersonCtrl'
            })
            .when('/new-person', {
                templateUrl: 'partials/new-person.html',
                controller: 'NewPersonCtrl'
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
            .when('/settings', {
                templateUrl: 'partials/settings.html'
            })
            .when('/', {
                templateUrl: 'partials/home.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);