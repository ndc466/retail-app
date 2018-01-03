/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// handles ajax calls to RESTful APIs

'use strict';
define(['jquery', 'settings'], function ($, settings) {

    var localUrl = 'localData/';

    var isOnline = true;

    // read-only MBE
    var baseUrl = 'https://mcssvc1dev-mcsidd1.mobileenv.us2.oraclecloud.com:443/mobile/custom/fixitfastclient/';
    var baseHeaders = {
        'Oracle-Mobile-Backend-Id': '938e86d4-693e-4963-b32f-5fe20eb02251',
        'Authorization': 'Basic TUNTSUREMV9NQ1NTVkMxREVWX01PQklMRV9BTk9OWU1PVVNfQVBQSUQ6VjNqeWMuNWtxcHRzbWY='
    };

    function setOnlineMode(mode) {
        //PM : isOnline = mode;
    }

    function getContacts() {
        // if (isOnline)
        //     return $.ajax({
        //         type: 'GET',
        //         headers: baseHeaders,
        //         url: baseUrl + 'customers'
        //     });
        // else {
        //     return $.ajax(localUrl + 'customers.txt');
        // }
    }

    function getCustomer(id) {
        // if (id) {
        //     if (isOnline) {
        //         return $.ajax({
        //             type: 'GET',
        //             headers: baseHeaders,
        //             url: baseUrl + 'customers/' + id
        //         });
        //     } else {
        //
        //         var promise = new Promise(function (resolve, reject) {
        //             $.get(localUrl + 'customers.txt').done(function (response) {
        //                 var contacts = JSON.parse(response).result;
        //                 var contact = contacts.filter(function (contact) {
        //                     return contact.id === id;
        //                 });
        //                 resolve(JSON.stringify(contact[0]));
        //             }).fail(function (response) {
        //                 reject(response);
        //             });
        //         });
        //
        //         return promise;
        //     }
        // }
        //
        // return $.when(null);
    }


    /**
     * Get all bots for this user
     * @returns {*}
     */
    function getBots(id) {
        if (isOnline) {
            return $.ajax(
                {
                    type: 'GET',
                    url: settings.serverUrl + '/botChannels',
                    // data: {
                    //     type: 'USER',
                    // },
                    success: function (data) {
                        console.log(data);
                        //callback(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("Error on GET bots");
                        console.log(errorThrown);
                        console.log(textStatus);
                        console.log(jqXHR.status);
                        console.log(jqXHR.responseText);
                        //callback(errorThrown, null);
                    },
                    dataType: "json"
                }
            );
        } else {
            return $.ajax(localUrl + 'bots.txt').then(function (response) {
                return response;
            });
        }
    }

    function getChannels(id) {
        // if (isOnline) {
        //     return $.ajax(
        //         {
        //             type: 'GET',
        //             url: serverUrl + '/channels',
        //             //data: {type: 'USER'},
        //             success: function (data) {
        //                 console.log(data);
        //                 callback(data);
        //             },
        //             error: function (jqXHR, textStatus, errorThrown) {
        //                 console.log("Error on GET channels");
        //                 console.log(errorThrown);
        //                 console.log(textStatus);
        //                 console.log(jqXHR.status);
        //                 console.log(jqXHR.responseText);
        //                 callback(errorThrown, null);
        //             },
        //             dataType: "json"
        //         }
        //     );
        // } else {
        //     return $.ajax(localUrl + 'channels.txt');
        // }
    }


    function getMessages(id) {

        if (id)
            if (isOnline) {
                return $.ajax({
                    type: 'GET',
                    headers: baseHeaders,
                    url: baseUrl + 'chats/' + id
                });
            } else {
                return $.get(localUrl + 'chats/demoData.txt');
            }

        return $.when(null);
    }


    function getUserProfile() {
        if (isOnline)
            return $.ajax({
                type: 'GET',
                headers: baseHeaders,
                url: baseUrl + 'users/~'
            });
        else {
            return $.get(localUrl + 'users.txt');
        }
    }

    function updateUserProfile(user) {
        return $.ajax({
            type: 'PATCH',
            headers: baseHeaders,
            url: baseUrl + 'users/~',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(user)
        });
    }


    function getUsers() {
        return $.get(localUrl + 'users.txt');
    }


    return {
        getContacts: getContacts,
        getCustomer: getCustomer,
        getUserProfile: getUserProfile,
        updateUserProfile: updateUserProfile,
        setOnlineMode: setOnlineMode,
        //PM
        getBots: getBots,
        getMessages: getMessages,
        getChannels: getChannels,
        getUsers: getUsers
    };

});
