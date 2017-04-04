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

            vm.item =
         {
             "ArtifactID": 1047572,
             "AuditID": 105290,
             "LastExecutionDate": "2017-03-31T20:12:53.53Z",
             "Details": {
                 "field": [
                   {
                       "@id": "1053267",
                       "@type": "0",
                       "@name": "J4_Fixed-Length Text",
                       "@formatstring": "",
                       "oldValue": null,
                       "newValue": "asdasdasd"
                   },
                   {
                       "@id": "1053268",
                       "@type": "4",
                       "@name": "J4_Long Text Field",
                       "@formatstring": "",
                       "oldValue": null,
                       "newValue": "sadasdsad"
                   },
                   {
                       "@id": "1053269",
                       "@type": "2",
                       "@name": "J4_Date Field",
                       "@formatstring": "g",
                       "oldValue": null,
                       "newValue": "2017-03-16 00:00:00"
                   },
                   {
                       "@id": "1053270",
                       "@type": "1",
                       "@name": "J4_Whole Number Field",
                       "@formatstring": "",
                       "oldValue": null,
                       "newValue": "52"
                   },
                   {
                       "@id": "1053271",
                       "@type": "6",
                       "@name": "J4_Decimal Field",
                       "@formatstring": "",
                       "oldValue": null,
                       "newValue": "552214"
                   },
                   {
                       "@id": "1053272",
                       "@type": "7",
                       "@name": "J4_Currency",
                       "@formatstring": "c",
                       "oldValue": null,
                       "newValue": "5252421"
                   },
                   {
                       "@id": "1053273",
                       "@type": "3",
                       "@name": "J4_ Yes/No Field",
                       "@formatstring": "",
                       "oldValue": null,
                       "newValue": "True"
                   },
                   {
                       "@id": "1053276",
                       "@type": "11",
                       "@name": "J4_User Field",
                       "@formatstring": "",
                       "oldValue": null,
                       "newValue": "1066244"
                   },
                   {
                       "@id": "1053298",
                       "@type": "10",
                       "@name": "Related Person",
                       "@formatstring": "",
                       "oldValue": null,
                       "newValue": "1053296"
                   },
                   {
                       "@id": "1053299",
                       "@type": "13",
                       "@name": "People",
                       "@formatstring": "",
                       "set": "1053296"
                   }
                 ]
             },
             "ArtifactName": "3.214170.LHM3AVTUXRRCAM2CKBE2L1ZAWTESSQHJA",
             "UserID": 1067213,
             "UserName": "Saldana, Javier",
             "Action": 3,
             "ActionName": "Update",
             "ArtifactTypeID": 10
         }

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
