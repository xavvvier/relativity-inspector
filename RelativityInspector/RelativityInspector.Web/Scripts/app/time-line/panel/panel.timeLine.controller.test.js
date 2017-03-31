(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .controller('test.panel.timeLine', panel);

    panel.$inject = ['$location', '$interval', 'signalR.core'];

    function panel($location, $interval, signalRCore) {
        /* jshint validthis:true */
        var vm = this;
        vm.signalRCore = signalRCore;

        vm.title = 'panel';
        vm.adutis = [
          {
              "ArtifactID": 1047573,
              "AuditID": Math.round((Math.random() * 1000)),
              "LastExecutionDate": "2017-03-31T18:06:44.663Z",
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
              "ArtifactName": "3.192626.L5KTES2B33FCCOB0ED3GL2LLEFKNYOH5B",
              "UserID": 1067213,
              "UserName": "Saldana, Javier",
              "Action": Math.round((Math.random() * 10)),
              "ActionName": "Update",
              "ArtifactTypeID": 10
          }
        ];

        activate();

        function activate() {
            signalRCore.registerNewData((x) => console.log(x));
            inserItems();
        }

        function inserItems() {

            $interval(() => {
                false && vm.adutis.push({
                    "ArtifactID": 1047573,
                    "AuditID": Math.round((Math.random() * 1000)),
                    "LastExecutionDate": "2017-03-31T18:06:44.663Z",
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
                    "ArtifactName": "3.192626.L5KTES2B33FCCOB0ED3GL2LLEFKNYOH5B",
                    "UserID": 1067213,
                    "UserName": "Saldana, Javier",
                    "Action": Math.round((Math.random() * 10)),
                    "ActionName": "Update",
                    "ArtifactTypeID": 10
                });

vm.adutis.push({
                    "ArtifactID": 1047573,
                    "AuditID": Math.round((Math.random() * 1000)),
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
                    "Action": Math.round((Math.random() * 10)),
                    "ActionName": "Update",
                    "ArtifactTypeID": 10
                });
            }, 2700);

        }
    }
})();
