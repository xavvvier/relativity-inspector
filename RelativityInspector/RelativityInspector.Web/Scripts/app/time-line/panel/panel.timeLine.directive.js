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
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();