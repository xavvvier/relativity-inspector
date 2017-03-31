(function () {
    'use strict';

    angular
        .module('app')
        .controller('main', main);

    main.$inject = ['signalR.core', '$log', 'objectType.core'];

    function main(signalRCore, $log, objectTypeCore) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'main';

        vm.data = {};
        vm.artifacts = {};
        vm.selectedTypes = [{
            ArtifactID: 10
        }];
        vm.getTextIdentifier = getTextIdentifier;

        activate();

        function activate() {

            getObjectTypes();

            signalRCore.registerNewData(newData);
        }

        function getObjectTypes() {

            objectTypeCore.get()
                .then(x => {

                    vm.objectTypes = x
                })
        }

        function newData(data) {

            console.table(data);

            angular.forEach(data, x => {

                if (!vm.data[x.ArtifactTypeID]) {
                    vm.data[x.ArtifactTypeID] = [];
                }

                vm.data[x.ArtifactTypeID] = vm.data[x.ArtifactTypeID].concat(x);

                !vm.artifacts[x.ArtifactID]
                    && getTextIdentifier(x.ArtifactID);
            });
        }

        function getTextIdentifier(id) {
            signalRCore.getTextIdentifier(id)
                .then(x => vm.artifacts[id] = x);
        }
    }
})();
