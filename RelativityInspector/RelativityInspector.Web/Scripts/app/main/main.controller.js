(function () {
    'use strict';

    angular
        .module('app')
        .controller('main', main);

    main.$inject = ['signalR.core', '$log'];

    function main(signalRCore, $log) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'main';

        activate();

        function activate() {
            signalRCore.registerNewData(newData);
        }

        function newData(data) {
            vm.data = data;
            $log.log(data);
        }
    }
})();
