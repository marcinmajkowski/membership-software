angular.module('membershipManagementDirectives', [])
    .directive('mmCard', function () {
        return {
            restrict: 'E',
            scope: {
                fullName: '=fullName',
                code: '=code'
            },
            templateUrl: 'directives/mm-card.html'
        }
    });