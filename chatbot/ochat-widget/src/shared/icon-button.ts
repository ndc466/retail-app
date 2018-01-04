/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";

export class IconButton extends Component {

    constructor(private onClick: Function,
                private imgSrc: string,
                private className: string = '') {
        super(onClick, imgSrc, className);
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    createElement(onClick, imgSrc, className): HTMLElement {
        var button = Component.createButton();
        button.onclick = () => onClick(button.innerText);
        button.className = 'ochat-button ochat-icon-button' + className;
        var i = (<HTMLImageElement>document.createElement('i'));
        i.className = 'ochat-icon';
        i.style.backgroundImage = 'url(\'' + imgSrc + '\')';
        button.appendChild(i);
        return button;
    }
}