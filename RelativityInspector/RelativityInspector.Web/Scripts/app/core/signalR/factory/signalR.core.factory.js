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
                $log.info('stateChanged', state);
                switch (state.newState) {
                    case $.signalR.connectionState.connecting:
                        //your code here
                        break;
                    case $.signalR.connectionState.connected:
                        //your code here
                        break;
                    case $.signalR.connectionState.reconnecting:
                        //your code here
                        break;
                    case $.signalR.connectionState.disconnected:
                        //your code here
                        break;
                }
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

        return {
            getTextIdentifier: getTextIdentifier,
            registerNewData: registerNewData,
        };

    }
})();