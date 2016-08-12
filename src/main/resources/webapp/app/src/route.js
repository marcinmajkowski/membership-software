angular.module('membershipSoftwareRoute', ['ngRoute'])

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
      .when('/', {
        templateUrl: 'src/home/view/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
