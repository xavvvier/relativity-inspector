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
              "ArtifactID": 1047573,
              "AuditID": 104999,
              "LastExecutionDate": "2017-03-31T18:06:44.663Z",
              "Details": {
                  "field": [
                    {
                        "@id": "1035357",
                        "@type": "5",
                        "@name": "Responsive Designation",
                        "@formatstring": "",
                        "unSetChoice": "1035871",
                        "setChoice": "1035891"
                    },
                    {
                        "@id": "1035377",
                        "@type": "8",
                        "@name": "Issue Designation",
                        "@formatstring": "",
                        "setChoice": "1038096"
                    },
                    {
                        "@id": "1035387",
                        "@type": "8",
                        "@name": "Privilege Designation",
                        "@formatstring": "",
                        "setChoice": [
                          "1038089",
                          "1038090"
                        ]
                    },
                    {
                        "@id": "1038055",
                        "@type": "5",
                        "@name": "Confidential Designation",
                        "@formatstring": "",
                        "setChoice": "1038092"
                    },
                    {
                        "@id": "1038062",
                        "@type": "5",
                        "@name": "RAR - Designation",
                        "@formatstring": "",
                        "unSetChoice": "1038468"
                    },
                    {
                        "@id": "1038164",
                        "@type": "4",
                        "@name": "Attorney Review Comments",
                        "@formatstring": "",
                        "oldValue": null,
                        "newValue": "sdsdfsdf"
                    },
                    {
                        "@id": "1049078",
                        "@type": "5",
                        "@name": "RAR2 - Designation",
                        "@formatstring": "",
                        "unSetChoice": "1049080",
                        "setChoice": "1049079"
                    }
                  ]
              },
              "ArtifactName": "3.192626.L5KTES2B33FCCOB0ED3GL2LLEFKNYOH5B",
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
