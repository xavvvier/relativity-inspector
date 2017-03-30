(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('signalR.core', signalR);

    signalR.$inject = ['Hub', '$log'];

    function signalR(Hub, $log) {

        var job = $.connection.auditHub;

        job.client.newData = function (data) {
            $log.log(data);
        };

        $.connection.hub.start();

        return {};
    }
})();