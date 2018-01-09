/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";

export class Button extends Component {

    constructor(private onClick: Function,
                private text: string,
                private className: string = '') {
        super(onClick, text, className);
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    createElement(onClick, text, className): HTMLElement {
        var button = Component.createAnchor();
        button.innerText = text;
        button.onclick = () => onClick(button.innerText);
        button.className = 'ochat-button ' + className;
        return button;
    }
}