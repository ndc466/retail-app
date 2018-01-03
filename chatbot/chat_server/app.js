const chatServer = require('./server/chat-server.js');

function init(config, httpServer) {

  return chatServer.init(config, httpServer);
}

module.exports = {
	init: init
};
