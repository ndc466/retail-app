/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// incidents list view viewModel
'use strict';
define(['ojs/ojcore',
        'knockout',
        'jquery',
        'dataService',
        'appController',
        'ojs/ojknockout',
        'ojs/ojoffcanvas',
        'ojs/ojlistview',
        'ojs/ojswipetoreveal',
        'ojs/ojjquery-hammer',
        'promise',
        'ojs/ojpulltorefresh',
        'ojs/ojmodel',
        'ojs/ojcheckboxset',
        'ojs/ojarraytabledatasource',
        'ojs/ojpopup',
        'ojs/ojanimation'],
    function (oj, ko, $, data, app) {
        function tabchannelsViewModel(params) {

            var self = this;

            // load bots on activation
            self.handleActivated = function (params) {

                self.botsPromise = params.valueAccessor().params['channelsPromise'];
                if (!self.botsPromise) {
                    self.botsPromise.then(function (response) {
                        var botData = JSON.parse(response);
                        processChannelsData(botData);
                    });
                }
                return self.botsPromise;
            };

            self.handleBindingsApplied = function (info) {
                if (app.pendingAnimationType === 'navParent') {
                    app.preDrill();
                }
            };

            self.handleAttached = function (info) {

                app.appUtilities.adjustContentPadding();

                oj.PullToRefreshUtils.setupPullToRefresh('body', function () {
                    return new Promise(function (resolve, reject) {
                        data.getChannels("id").then(function (response) {
                            var botData = JSON.parse(response);
                            processBotsData(botData);
                            resolve();
                        }).fail(function (response) {
                            //TODO
                            console.log(response);
                            reject();
                        });
                    });
                    // TODO fix refresh issue on transition
                }, {'primaryText': 'Checking for new incidents…', 'secondaryText': '', 'threshold': 100});

                // adjust position for pull to refresh panel
                var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
                var contentElems = document.getElementsByClassName('oj-pulltorefresh-panel');

                for (var i = 0; i < contentElems.length; i++) {
                    if (topElem) {
                        contentElems[i].style.position = 'relative';
                        contentElems[i].style.top = topElem.offsetHeight + 'px';
                    }
                }
            };

            self.handleTransitionCompleted = function (info) {
                if (app.pendingAnimationType === 'navParent') {
                    app.postDrill();
                }
            };

            function processChannelsData(channels) {
                channels.forEach(function (channel) {
                    channel.statusObservable = ko.observable(channel.status);
                });
                self.allChannels(channels);
            }

            self.scrollElem = document.body;

            //PM
            self.allChannels = ko.observableArray([]);
            self.channelsTableData = new oj.ArrayTableDataSource(self.allChannels, {idAttribute: 'id'});


            self.goToAddChannel = function () {
                app.goToCreateChannel();
            };

            self.selectHandler = function (event, ui) {

                oj.Logger.info('Selected ' + event);

                if (ui.option === 'selection') {
                    event.preventDefault();

                    app.pendingAnimationType = 'navChild';
                    console.log(ui);
                    app.goToChat(ui.value[0], 'tabChannels');
                }
            };


            self.handleReady = function () {
                // register swipe to reveal for all new list items
                $("#incidentsListView").find(".demo-item-marker").each(function (index) {
                    var id = $(this).prop("id");
                    var startOffcanvas = $(this).find(".oj-offcanvas-start").first();
                    var endOffcanvas = $(this).find(".oj-offcanvas-end").first();

                    // setup swipe actions
                    oj.SwipeToRevealUtils.setupSwipeActions(startOffcanvas);
                    oj.SwipeToRevealUtils.setupSwipeActions(endOffcanvas);

                    // make sure listener only registered once
                    endOffcanvas.off("ojdefaultaction");
                    endOffcanvas.on("ojdefaultaction", function () {
                        // No default action
                    });
                });
            };

            self.handleDestroy = function () {
                // register swipe to reveal for all new list items
                $("#incidentsListView").find(".demo-item-marker").each(function (index) {
                    var startOffcanvas = $(this).find(".oj-offcanvas-start").first();
                    var endOffcanvas = $(this).find(".oj-offcanvas-end").first();

                    oj.SwipeToRevealUtils.tearDownSwipeActions(startOffcanvas);
                    oj.SwipeToRevealUtils.tearDownSwipeActions(endOffcanvas);
                });
            };

            self.closeToolbar = function (which, item) {
                var toolbarId = "#" + which + "_toolbar_" + item.prop("id");
                var drawer = {"displayMode": "push", "selector": toolbarId};

                oj.OffcanvasUtils.close(drawer);
            };

            self.handleAction = function (which, action, model) {

                if (model !== null && model.id) {
                    // offcanvas won't be open for default action case
                    if (action != "default") {
                        self.closeToolbar(which, $(model));
                    }

                } else {
                    //PM id = $("#incidentsListView").ojListView("option", "currentItem");
                }
            };

            self._handleAccept = function (model) {
                self.handleAction('second', 'accepted', model);
            };

            self._handleOpen = function (model) {
                self.handleAction('second', 'open', model);
            };

            self._handleReturn = function (model) {
                self.handleAction('second', 'open', model);
            };

            self._handleTrash = function (model) {
                self.handleAction('second', 'closed', model);
            };

            self._handleOKCancel = function () {
                $("#modalDialog1").ojDialog("close");
            };

            self.removeModel = function (model) {

            };

        }

        return tabchannelsViewModel;
    });
