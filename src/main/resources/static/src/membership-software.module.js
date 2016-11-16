(function () {
    'use strict';

    angular
        .module('membershipSoftware', [
            'ngMaterial',
            'ngResource',
            'membershipSoftwareRoute',
            'membershipSoftwareConstants',
            'membershipSoftwareLayout',
            'home',
            'checkIns',
            'payments',
            'users',
            'customers',
            'memberships'
        ]);

})();