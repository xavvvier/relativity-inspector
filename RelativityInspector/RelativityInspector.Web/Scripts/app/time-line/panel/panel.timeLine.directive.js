(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .directive('panelTimeLine', panel);

    panel.$inject = ['$window', '$interval'];

    function panel($window, $interval) {
        // Usage:
        //     <panel-time-line></panel-time-line>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Scripts/app/time-line/panel/panel.timeLine.directive.html',
            controller: 'panel.timeLine',
            controllerAs: 'panel',
            scope: {
                items: '='
            },
            bindToController: true,
        };
        return directive;

        function link(scope, element, attrs) {
            var elementJq = $('.panel-content', element);
            var inirwidth = elementJq.get(0).clientWidth;
            $interval(() => {
                if (elementJq.get(0).scrollWidth > inirwidth) {
                    elementJq.animate({
                        scrollLeft: (inirwidth += 14) - elementJq.get(0).clientWidth
                    }, 250);
                }
            }, 500);
        }

    }

})();