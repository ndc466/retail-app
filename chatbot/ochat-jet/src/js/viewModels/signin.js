/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// signin page viewModel
// In a real app, replace it with your authentication and logic
'use strict';
define(['ojs/ojcore',
    'knockout', 'jquery',
    'dataService',
    'settings',
    'ojs/ojrouter',
    'ojs/ojknockout',
    'ojs/ojcheckboxset',
    'ojs/ojinputtext',
    'ojs/ojbutton',
    'ojs/ojselectcombobox',
    'ojs/ojanimation'], function (oj, ko, $, ds, settings) {
    function signinViewModel() {
        var self = this;


        self.handleActivated = function () {
            ds.getUsers().then(function (response) {
                self.users(JSON.parse(response));
                self.user([self.users()[0].id]);
            });
        };

        self.handleTransitionCompleted = function (info) {
            // invoke fadeIn animation
            var animateOptions = {'delay': 0, 'duration': '1s', 'timingFunction': 'ease-out'};
            oj.AnimationUtils['fadeIn']($('.demo-signin-bg')[0], animateOptions);
        };

        // Replace with state save logic for rememberUserName
        self.serverUrl = ko.observable();
        self.rememberUrl = ko.observable('remember');
        self.users = ko.observableArray([]);
        self.user = ko.observableArray([]);

        // Replace with sign in authentication
        self.signIn = function () {
            if (serverUrl.length < 1) return;

            settings.setUser(self.user()[0]);
            settings.setBaseUrl(self.serverUrl());
            oj.Router.rootInstance.go('chatsMain');
        };
    }

    return signinViewModel;
});
