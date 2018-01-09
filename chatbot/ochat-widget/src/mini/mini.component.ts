/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";
import {Settings} from "../settings";
import {IconButton} from "../shared/icon-button";
import {Header} from "../shared/header";

export class MiniComponent extends Component {

    content: HTMLElement;

    constructor(private settings: Settings,
                private onOpen: Function) {
        super(settings, onOpen);
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    createElement(settings, onOpen): HTMLElement {
        var openButton = new IconButton(onOpen.bind(this), settings.openIcon);
        var header = new Header(settings.miniTitle, 'ochat-mini', openButton);
        return header.element;
    }
}