/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(['ojs/ojcore', 'knockout', 'jquery',
    'dataService',
    'ojs/ojknockout'], function (oj, ko, $, data) {
    function chatTabFilesViewModel(params) {

        var self = this;

        self.handleTransitionCompleted = function () {
            // adjust padding for details panel
            var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];

            if (topElem) {
                $('#detailsPanel').css('padding-top', topElem.offsetHeight + 'px');
            }

            // dismiss details panel when click on map
            $('#map').on('click touchstart', function () {
                $('#detailsPanel').slideUp();
            })

        }


        self.showDetails = function () {
            $("#detailsPanel").slideToggle();
        };

    }

    return chatTabFilesViewModel;
});
