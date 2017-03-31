(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .controller('panel.timeLine', panel);

    panel.$inject = ['$interval'];

    function panel($interval) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'panel';
        vm.nowTime = new Date();
        vm.sectionTimers = [];
        vm.clearAudits = clearAudits;
        vm.globalIndex = 0;
        vm.positionX = 15;

        activate();

        function activate() {
            initTimer();
        }

        function initTimer() {
            $interval(x => {
                vm.sectionTimers.push({
                    oldTime: vm.nowTime,
                    time: vm.nowTime = new Date(),
                    items: vm.items.splice(0, vm.items.length),
                    index: vm.globalIndex++
                });
            }, 500);
        }

        function clearAudits() {
            vm.sectionTimers.splice(0, 1);
        }

    }
})();
