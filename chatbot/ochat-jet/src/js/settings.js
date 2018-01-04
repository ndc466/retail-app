/**
 * Created by PMOGILEV on 1/23/17.
 */

'use strict';
define([], function () {

    var user = '1';

    var options = {
        server: 'localhost:8888',
        route: '/chat/ws?user='
    };

    function setBaseUrl(url) {
        options.server = url;
    }

    function setUser(user) {
        user = user;
    }

    return {
        setUser: setUser,
        wsUrl: "ws://" + options.server + options.route + user,
        setBaseUrl: setBaseUrl,
        serverUrl: 'http://' + options.server + '/apps/chat'
    };
});

