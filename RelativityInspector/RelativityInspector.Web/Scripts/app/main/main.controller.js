(function () {
    'use strict';

    angular
        .module('app')
        .controller('main', main);

    main.$inject = ['signalR.core'];

    function main(signalRCore) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'main';

        activate();

        function activate() { }
    }
})();
