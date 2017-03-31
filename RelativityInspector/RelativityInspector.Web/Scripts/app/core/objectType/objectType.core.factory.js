(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('objectType.core', objectType);

    objectType.$inject = ['$http', '$q', '$log'];

    function objectType($http, $q, $log) {
        var service = {
            get: getData
        };

        return service;

        function getData() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('api/ObjectType', {
                cache: false,
            })
                .then(x => {
                    defered.resolve(x.data);
                })
                .catch(x => {
                    defered.reject(x);
                });

            return promise;
        }
    }
})();