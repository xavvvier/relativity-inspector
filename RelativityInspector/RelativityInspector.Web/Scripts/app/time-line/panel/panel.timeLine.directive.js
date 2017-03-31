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
            var advantage = 4;
            var flag = 0;
            $interval(() => {
                if (elementJq.get(0).scrollWidth > inirwidth) {
                    elementJq.animate({
                        scrollLeft: (inirwidth += 15) - elementJq.get(0).clientWidth
                    }, 450);
                    if (advantage < flag) {
                        scope.panel.clearAudits();
                    } else {
                        flag++;
                    }
                }
            }, 500);
        }

    }

})();