/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(['ojs/ojcore',
    'knockout',
    'jquery',
    'dataService',
    'appController',
    'ojs/ojknockout'], function (oj, ko, $, data, app) {
    function chatViewModel() {
        var self = this;

        self.chatData = ko.observableArray([]);


        self.handleActivated = function (params) {

            var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];

            self.router = parentRouter.createChildRouter('chat').configure(function (stateId) {

                if (stateId) {
                    var state = new oj.RouterState(stateId, {
                        enter: function () {
                            // data.getMessages(stateId).then(function (response) {
                            //     var chatData = JSON.parse(response);
                            //     self.chatData(chatData);
                            // });
                        }
                    });
                    return state;
                }
            });
            return oj.Router.sync();
        };

        self.dispose = function (info) {
            self.router.dispose();
        };

        self.locationId = ko.computed(function () {
            //
        });

        // switch to incidentViews and pass incident location to it
        self.moduleConfig = ko.pureComputed(function () {
            var moduleConfig = $.extend(true, {}, self.router.moduleConfig, {
                'name': 'chatViews',
                'params': {'locationId': self.locationId}
            });

            return moduleConfig;
        });

        // update incident when status or priority changes
        self.updateIncident = function (id, incident) {
            data.updateIncident(id, incident).then(function (response) {
                // update success
            }).fail(function (response) {
                oj.Logger.error('Failed to update incident.', response);
            });
        };

        // priority selection change
        self.priorityChange = function (event, data) {
            updatePriorityStatus('priority', data);
        };

        // status selection change
        self.statusChange = function (event, data) {
            updatePriorityStatus('status', data);
        };

        function updatePriorityStatus(option, data) {
            // if (data.option === "value") {
            //     if (data.value) {
            //         self.updateIncident(self.router.stateId(), {[option]: data.value});
            //     }
            // }
        }

    }

    return chatViewModel;

});
