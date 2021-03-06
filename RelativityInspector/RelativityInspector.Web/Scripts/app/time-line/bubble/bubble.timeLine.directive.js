﻿(function() {
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
            restrict: 'E',
            templateUrl: 'Scripts/app/time-line/bubble/bubble.timeLine.directive.html',
            controller: 'bubble.timeLine',
            controllerAs: 'bubble',
            scope: {
                item: '='
            },
            bindToController: true,
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();