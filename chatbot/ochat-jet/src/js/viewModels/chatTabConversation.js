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
    'jquery',
    'knockout',
    'dataService',
    'wsService',
    'appController',
    'ojs/ojknockout',
    'ojs/ojarraytabledatasource',
    'ojs/ojinputtext',
    'ojs/ojtoolbar',
    'ojs/ojlistview'], function (oj, $, ko, dataService, ws, app) {
    function chatTabConversationModel() {
        var self = this;
        self.dataSource = ko.observableArray([]);
        self.scrollElem = document.body;
        self.textValue = ko.observable();
        self.imageSrc = ko.observable();

        var channel; //curretn channelId


        self.handleActivated = function (params) {

            channel = params.valueAccessor().params.ojRouter.parentRouter.parent.stateId()

            processMessageData([]);
            ws.connect();
            ws.subscribe(channel, self.onMessage.bind(self));

            //return Promise.resolve();

            // return dataService.getMessages("hahah").then(function (response) {
            //     var messages = JSON.parse(response);
            //     processMessageData(messages);
            // });

        };

        // adjust content padding top
        self.handleAttached = function (info) {
            app.appUtilities.adjustContentPadding();
        };

        self.handleBindingsApplied = function (info) {
            if (app.pendingAnimationType === 'navParent' || app.pendingAnimationType === 'navChild') {
                app.preDrill();
            }
        };

        self.onMessage = function (message) {
            message.id = "21";
            self.dataSource.add(message);
        };

        self.handleTransitionCompleted = function (info) {
            if (app.pendingAnimationType === 'navParent' || app.pendingAnimationType === 'navChild') {
                app.postDrill();
            }
        };

        // trigger click when selection changes
        self.selectHandler = function (event, ui) {
            if (ui.option === 'selection') {
                event.preventDefault();
                self.postActivity(ui.items[0].innerText);
            }
        };

        function processMessageData(messages) {
            self.dataSource = new oj.ArrayTableDataSource(messages, {idAttribute: "id"});
        }

        self.onEnter = function(d,e){

            console.log("on something !");
            if (e.keyCode == 13) {
                console.log("Enter is here!");
            }
        }

        self.postActivity = function (text) {

            if(!text || text.length === 0) return;

            var message = {
                "to": {
                    "id": channel,
                    "type": "bot"
                },
                "text": text
            };

            ws.sendMessage(message);

            message.id = "21";

            message.from = {
                "type": "self"
            };

            self.dataSource.add(message);

            //stupid way to clear this value
            setTimeout(function(){ self.textValue(null); },100);

        }

    }

    return chatTabConversationModel;
});
