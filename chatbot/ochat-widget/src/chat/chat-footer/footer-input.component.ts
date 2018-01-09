/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../../component";
import {IconButton} from "../../shared/icon-button";
import {Footer} from "../../shared/footer";

export class ChatFooterComponent extends Component {
    input: HTMLInputElement;

    constructor(private onSend: Function, private sendButtonImgSrc: string, private inputPlaceholder: string) {
        super(sendButtonImgSrc, inputPlaceholder);
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    createElement(sendButtonImgSrc, inputPlaceholder): HTMLElement {
        this.input = Component.createInput();
        this.input.className = 'ochat-chat-message-input';
        this.input.onkeypress = this.onInputKeyPress.bind(this);
        this.input.placeholder = inputPlaceholder;
        var sendButton = new IconButton(this.onClick.bind(this), sendButtonImgSrc);
        var footer = new Footer();
        footer.appendContentChildElement(this.input);
        footer.appendContentChild(sendButton);
        return footer.element;
    }

    onInputKeyPress(event) {
        if (event.key === 'Enter' && this.input.value !== '') {
            this._onSend();
        }
    }

    onClick() {
        if (this.input.value !== '') {
            this._onSend();
        }
    }

    _onSend() {
        this.onSend(this.input.value);
        this.input.value = '';
    }
}