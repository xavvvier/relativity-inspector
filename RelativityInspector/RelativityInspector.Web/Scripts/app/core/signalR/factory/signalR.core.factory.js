(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('signalR.core', signalR);

    signalR.$inject = ['Hub', '$log', '$timeout', '$q'];

    function signalR(Hub, $log, $timeout, $q) {

        var listeners = {
            newData: []
        };
        var factory = {};
        var status = -1;
        var hub = new Hub('auditHub', {

            //client side methods
            listeners: {
                'newData': function (data) {
                    angular.forEach(listeners.newData, x => {
                        $timeout(y => x.call(null, data));
                    });
                },
            },

            //server side methods
            methods: ['TextIdentifier'],

            //query params sent on initial connection
            queryParams: {
            },

            //handle connection error
            errorHandler: function (error) {
                $log.error(error);
            },

            //specify a non default root
            rootPath: 'SignalR',

            stateChanged: function (state) {
                $timeout(() => {
                    $log.info('stateChanged', state);
                    switch (state.newState) {
                        case $.signalR.connectionState.connecting:
                            factory.status = 0;
                            break;
                        case $.signalR.connectionState.connected:
                            factory.status = 1;
                            break;
                        case $.signalR.connectionState.reconnecting:
                            factory.status = 2;
                            break;
                        case $.signalR.connectionState.disconnected:
                            factory.status = 3;
                            break;
                    }
                });
            }
        });

        function getTextIdentifier(artifactID) {
            var defered = $q.defer();
            var promise = defered.promise;

            hub.TextIdentifier(artifactID)
                .then(defered.resolve);

            return promise;
        };

        function registerNewData(listener) {
            listeners.newData.push(listener);
        }

        return factory = {
            status: status,
            getTextIdentifier: getTextIdentifier,
            registerNewData: registerNewData,
        };

    }
})();