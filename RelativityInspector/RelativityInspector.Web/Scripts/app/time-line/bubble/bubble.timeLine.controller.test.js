(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .controller('test.bubble.timeLine', bubble);

    bubble.$inject = ['$location']; 

    function bubble($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'bubble';
        vm.initials = initials;

        activate();

        function activate() {

            vm.item = {
                "ArtifactID": 1047559,
                "AuditID": 104324,
                "LastExecutionDate": "2017-03-31T02:48:18.843",
                "Details": null,
                "ArtifactName": "3.309893.KBAKGIF0PGUZHO3SAIPWE25TTESIB35OB",
                "UserID": 1067213,
                "UserName": "Saldana, Javier",
                "Action": 1,
                "ActionName": "View",
                "ArtifactTypeID": 10
            };
        }
        function initials() {
            var name = String(vm.item.UserName);
            if (name.indexOf(',') >= 0) {
                var chunks = name.split(',');
                if (chunks.length >= 2 && chunks[0].length > 0 && chunks[1].length > 0) {
                    return chunks[1].substr(1, 1).toUpperCase() + chunks[0].substr(1, 1).toUpperCase();
                }
            }
            return name.substr(0, 1).toUpperCase();
        }
    }
})();
