(function(){
  'use strict';

  angular.module('customers')
         .factory('customerService', ['$resource', CustomerService]);

  function CustomerService($resource){
    var customersUrl = '/api/v1/customers/:id';

    var resource = $resource(customersUrl, {}, {
        'query': {
            method: 'GET',
            isArray: true,
            transformResponse: function (data, headersGetter) {
                return angular.fromJson(data)._embedded.customers;
            }
        }
    });

    var customers = [].concat(resource.query());

    return {
        all: function () {
            return customers;
        }
    };
  }

})();
