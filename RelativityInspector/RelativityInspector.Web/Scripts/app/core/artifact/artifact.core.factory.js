(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('artifact.core', artifact);

    artifact.$inject = ['signalR.core'];

    function artifact(signalRCore) {

        var artifacts = {};
        var inRequest = {};

        var service = {
            binding: binding
        };

        return service;

        function binding(artifactID) {
            if (!artifacts[+artifactID] && !inRequest[+artifactID]) {
                inRequest[+artifactID] = true;
                signalRCore.getTextIdentifier(+artifactID)
                    .then(x => {
                        console.log('binding', artifactID, x);
                        artifacts[+artifactID] = x
                    });
            }
            return artifacts;
        }
    }
})();