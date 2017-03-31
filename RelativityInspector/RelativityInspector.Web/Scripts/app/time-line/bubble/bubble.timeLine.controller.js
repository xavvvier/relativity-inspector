(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .controller('bubble.timeLine', bubble);

    bubble.$inject = ['$location', '$mdDialog'];

    function bubble($location, $mdDialog) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'bubble';
        vm.displayDetail = displayDetail;
        vm.initials = initials;

        activate();

        function activate() { }
        function initials() {
            var name = String(vm.item.UserName);
            if (name.indexOf(', ') >= 0) {
                var chunks = name.split(', ');
                if (chunks.length >= 2 && chunks[0].length > 0 && chunks[1].length > 0) {
                    return chunks[1].substr(0, 1).toUpperCase() + chunks[0].substr(0, 1).toUpperCase();
                }
            }
            return name.substr(0, 1).toUpperCase();
        }
        function displayDetail(ev) {
            $mdDialog.show({
                contentElement: '#Artifact' + vm.item.AuditID,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    }
})();
