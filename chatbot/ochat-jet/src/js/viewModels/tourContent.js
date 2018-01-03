/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

 // view model for the tour content with filmstrip
'use strict';
define(['jquery', 'ojs/ojfilmstrip', 'ojs/ojpagingcontrol'], function($) {
  function tourContentViewModel() {
    var self = this;

    self.steps = [
      {
        'title': 'bots',
        'description': 'Connect to your bots.',
        'imgSrc': 'css/images/team_icon.jpg',
        'color': '#4493cd'
      },
      {
        'title': 'notifications',
        'description': 'Receive notifications from everywhere',
        'imgSrc': 'css/images/maps_image@2x.png',
        'color': '#FFD603'
      },
      {
        'title': 'team',
        'description': 'Have your team information easily available.',
        'imgSrc': 'css/images/customers_image@2x.png',
        'color': '#009636'
      }
    ];

    self.pagingModel = null;

    self.getItemInitialDisplay = function(index) {
      return index < 1 ? '' : 'none';
    };

    self.getPagingModel = function() {
      if (!self.pagingModel) {
        var filmStrip = $("#filmStrip");
        var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
        self.pagingModel = pagingModel;
      }
      return self.pagingModel;
    };

  }
  return tourContentViewModel;
});
