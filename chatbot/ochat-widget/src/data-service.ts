/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Logger} from "./logger";
import {Settings} from "./settings";

export class DataService {
    subscriber: any;
    messages: any;
    ws: any;

    constructor(private settings: Settings, private logger: Logger) {
        this.messages = [];
        this.openSocket();
    }

    openSocket() {

        if (!this.settings.channel || this.settings.channel.length === 0) {
            this.settings.channel = prompt('Please enter bot channel id. You can find this id as last parameter in Webhook URL field on botsui.', '');
        }

        let uri = this.settings.uri + '?user=' + this.settings.userId;

        this.ws = new WebSocket(uri);
        this.ws.addEventListener('open', () => this.logger.verbose('ws.Open'));
        this.ws.addEventListener('message', event => {
            this.logger.verbose('msg received: ', event.data);
            var msg = JSON.parse(event.data);
            this.broadcast(msg);
        });
        this.ws.addEventListener('close', () => this.logger.verbose('ws.Close'));
        this.ws.addEventListener('error', event => this.logger.error("The socket had an error", event));
    }

    subscribe(fn) {
        this.logger.info('subscribe to channel', this.settings.channel);
        this.subscriber = fn;
    }

    unSubscribe() {
        this.logger.info('unsubscribe to channel', this.settings.channel);
        this.subscriber = null;
    }

    loadChat() {
        if (!this.messages) {
            this.messages = [];
        }
        return Promise.resolve(this.messages);
    }

    broadcast(msg) {
        this.messages.push(msg);
        this.subscriber(msg);
    }

    send(message: any) {
        this.logger.verbose('send to channel', message);
        this.messages.push(message);
        if (message.text === '@video') {
            this.broadcast({
                "from": {
                    "type": "bot",
                    "id": "0000"
                },
                "body": {
                    "text": "Please watch our video.\n\nhttps://youtu.be/-Q4JZTI0t1Y",
                    "userId": "000"
                }
            });
        } else if (message.text === '@link') {
            this.broadcast({
                "from": {
                    "type": "bot",
                    "id": "0000"
                },
                "body": {
                    "text": "Please visit Oracle site for more information.\n\nhttps://www.oracle.com",
                    "userId": "000"
                }
            });
        } else {
            this.ws.send(JSON.stringify(message));
        }
    }

}