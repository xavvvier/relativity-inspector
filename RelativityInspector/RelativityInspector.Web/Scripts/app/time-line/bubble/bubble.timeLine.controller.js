(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .controller('bubble.timeLine', bubble);

    bubble.$inject = ['$location']; 

    function bubble($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'bubble';

        activate();

        function activate() { }
    }
})();
