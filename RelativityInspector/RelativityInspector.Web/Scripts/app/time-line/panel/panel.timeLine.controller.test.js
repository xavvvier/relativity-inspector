﻿(function () {
    'use strict';

    angular
        .module('app.timeLine')
        .controller('test.panel.timeLine', panel);

    panel.$inject = ['$location'];

    function panel($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'panel';
        vm.adutis = [
          {
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
          }
        ];

        activate();

        function activate() {

        }
    }
})();
