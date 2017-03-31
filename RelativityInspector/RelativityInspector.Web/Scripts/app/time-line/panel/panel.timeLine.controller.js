(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .controller('panel.timeLine', panel);

    panel.$inject = ['$location']; 

    function panel($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'panel';

        activate();

        function activate() { }
    }
})();
