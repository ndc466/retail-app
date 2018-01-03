/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// This incidents viewModel controls dashboard/list/map tabs.

'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'dataService', 'appController', 'ojs/ojknockout', 'ojs/ojpopup'], function (oj, ko, $, data, app) {

    function incidentsViewModel() {

        var self = this;

        self.showFilterBtn = ko.observable(false);

        self.handleActivated = function (params) {

            // setup child router
            var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];

            self.router = parentRouter.createChildRouter('chatsMain').configure({
                'tabBots': {label: 'Bots', isDefault: true},
                'tabChannels': {label: 'Channels'},
                'tabContacts': {label: 'Contacts'}
            });

            //PM
            self.router.moduleConfig.params['botsPromise'] = data.getBots("id");
            self.router.moduleConfig.params['channelsPromise'] = data.getChannels("id");

            // setup animations between nav tabs
            self.pendingAnimationType = null;

            var switcherCallback = function (context) {
                return self.pendingAnimationType;
            };

            var mergeConfig = function (original) {
                return $.extend(true, {}, original, {
                    'animation': oj.ModuleAnimations.switcher(switcherCallback)
                });
            };

            // pass animation to module transition on nav tab content
            self.moduleConfig = mergeConfig(self.router.moduleConfig);

            return oj.Router.sync();
        };

        self.dispose = function (info) {
            self.router.dispose();
        };

        // update nav tabs animation based on selection change
        self.navBarChange = function (event, ui) {

            if (ui.option === 'currentItem') {

                var previousValue = ui.previousValue || self.router.stateId();

                switch (previousValue) {
                    case 'tabbots':
                        self.pendingAnimationType = 'navSiblingLater';
                        break;
                    case 'tabchannels':
                        if (ui.value === 'tabbots') {
                            self.pendingAnimationType = 'navSiblingEarlier';
                        } else {
                            self.pendingAnimationType = 'navSiblingLater';
                        }
                        break;
                    case 'tabcontacts':
                        self.pendingAnimationType = 'navSiblingEarlier';
                }
            }
        };

        self.closePopup = function () {
            return $('#filterpopup').ojPopup('close', '#filterIncident');
        };

        self.scrollElem = document.body;

        // settings for headers on incidents page
        self.chatsMainHeaderSettings = {
            name: 'basicHeader',
            params: {
                title: 'Incidents',
                startBtn: {
                    click: app.toggleDrawer,
                    display: 'icons',
                    label: 'Navigation Drawer',
                    icons: {start: 'oj-fwk-icon oj-fwk-icon-hamburger'},
                    visible: true
                },
                endBtn: {
                    click: function () {
                        $("#filterpopup").ojPopup("option", "position", {
                            "my": "center top",
                            "at": "center top+50",
                            "of": ".oj-applayout-content"
                        });

                        return $('#filterpopup').ojPopup('open', '#filterIncident');
                    },
                    display: 'icons',
                    label: 'incidents filters',
                    icons: {start: 'oj-fwk-icon demo-icon-font-24 demo-filter-icon'},
                    visible: self.showFilterBtn
                }
            }
        }
    }

    return incidentsViewModel;
});
