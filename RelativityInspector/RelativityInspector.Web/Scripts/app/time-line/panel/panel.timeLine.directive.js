(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .directive('panelTimeLine', panel);

    panel.$inject = ['$window'];

    function panel($window) {
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

        }

    }

})();