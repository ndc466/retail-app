/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";
import {DataService} from "../data-service";
import {Settings} from "../settings";
import {Utils} from "../utils";
import {Logger} from "../logger";
import {LoadingComponent} from "../loading/loading.component";
import {ChoicesComponent} from "./choices.component";
import {responseTemplate} from "../../templates/src/chat/response.template.thml";
import {messageTemplate} from "../../templates/src/chat/message.template.thml";
import {messageWrapperTemplate} from "../../templates/src/chat/message-wrapper.template.thml";
import {Header} from "../shared/header";
import {IconButton} from "../shared/icon-button";
import {ChatFooterComponent} from "./chat-footer/footer-input.component";
import {chatTemplate} from "../../templates/src/chat/chat.template.thml";

export class ChatComponent extends Component {

    static MESSAGES_ID = 'ochat_widget_messages';

    messages: Array<any>;
    message: string;
    input: HTMLInputElement;

    constructor(private dataService: DataService,
                private settings: Settings,
                private utils: Utils,
                private logger: Logger,
                private loadingComponent: LoadingComponent,
                private onClose: Function) {
        super(settings, onClose);

        loadingComponent.present('Please wait ...');
        var self = this;
        dataService.loadChat().then(messages => {
            self.messages = messages.slice();
            setTimeout(() => {
                self.renderMessages();
                self.scrollToBottom();
                loadingComponent.dismiss();
                dataService.subscribe(self.onMessageReceived.bind(self));
            }, 0);
        });
    }

    createElement(settings, onClose): HTMLElement {
        var div = Component.createHTML(chatTemplate);
        var footer = new ChatFooterComponent(this.sendMessage.bind(this), settings.sendIcon, settings.chatInputPlaceholder);
        footer.appendToElement(div);

        var closeButton = new IconButton(onClose.bind(this), settings.closeIcon);
        var header = new Header(settings.chatTitle, 'ochat-chat-title', closeButton);
        header.prependToElement(div);
        return div;
    }

    render(element): void {
    }

    remove() {
        super.remove();
        this.dataService.unSubscribe();
    }

    renderMessages() {
        // TODO: change to elements instead of strings
        var messagesElement = document.getElementById(ChatComponent.MESSAGES_ID);
        var messagesHtml = '';
        var choices = {};
        for (var idx in this.messages) {
            if (this.messages.hasOwnProperty(idx)) {
                var message = this.messages[idx];
                var wrapper = this.utils.clone(messageWrapperTemplate);
                var messageHtml = this.utils.clone(message.from ? responseTemplate : messageTemplate);
                var img = message.from ? this.settings.robotIcon : this.settings.personIcon;
                if (message.body && message.body.choices && +idx === this.messages.length - 1) {
                    var component = new ChoicesComponent(message.body.choices, this.choicesSelected.bind(this));
                    choices[idx] = component;
                }
                let text: string;
                if (message.body && message.body.text) {
                    text = message.body.text;
                } else if (message.text) {
                    text = message.text;
                } else {
                    text = message.error.message;
                }
                text = this.utils.linkify(text, this.settings.embeddedVideo);
                messagesHtml += wrapper
                    .replace('{message}', messageHtml.replace('{message}', text)
                        .replace('{profile-pic}', img)).replace('{choices}', '<div id="ochat_choices_' + idx + '"></div>');
            }
        }
        messagesElement.innerHTML = messagesHtml;
        for (var idx in choices) {
            if (choices.hasOwnProperty(idx)) {
                var elem = document.getElementById('ochat_choices_' + idx);
                choices[idx].render(elem);
            }
        }
    }

    onMessageReceived(message) {
        this.messages.push(message);
        this.renderMessages();
        this.scrollToBottom();
    }

    sendMessage(text: string): void {
        var message = {
            to: {
                type: 'bot',
                id: this.settings.channel
            },
            text: text

        };
        this.messages.push(message);
        this.renderMessages();
        this.scrollToBottom();
        this.dataService.send(message);
    }

    choicesSelected(component: ChoicesComponent, choice) {
        component.remove();
        this.sendMessage(choice);
    }

    scrollToBottom() {
        setTimeout(() => {
            var element = document.getElementById(ChatComponent.MESSAGES_ID);
            element.scrollTop = element.scrollHeight - 300;
        }, 0);
    }
}