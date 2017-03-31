(function () {
    'use strict';

    angular
        .module('app')
        .controller('main', main);

    main.$inject = ['signalR.core', '$log'];

    function main(signalRCore, $log) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'main';

        vm.data = {};
        vm.artifacts = {};
        vm.selectedTypes = [{
            ArtifactTypeID: 10
        }];
        vm.getTextIdentifier = getTextIdentifier;
        vm.objectTypes = [
            { Name: 'Document', ArtifactTypeID: 10 },
            { Name: 'Seach', ArtifactTypeID: 15 },
            { Name: 'Custpdian', ArtifactTypeID: 1000040 },
        ];

        activate();

        function activate() {
            signalRCore.registerNewData(newData);
        }

        function newData(data) {

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
