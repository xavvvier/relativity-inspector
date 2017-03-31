(function() {
    'use strict';

    angular
        .module('app.timeLine')
        .directive('bubbleTimeLine', bubble);

    bubble.$inject = ['$window'];
    
    function bubble ($window) {
        // Usage:
        //     <bubble-time-line></bubble-time-line>
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