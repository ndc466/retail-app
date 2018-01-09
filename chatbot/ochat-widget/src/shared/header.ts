/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";

/**
 *  <div class="ochat-header">
 *      <span class="ochat-header-title">{title}</span>
 *  </div>
 */
export class Header extends Component {

    constructor(private title: string,
                private className: string = '',
                private rightButton: Component = null,
                private leftButton: Component = null) {
        super(title, className, rightButton, leftButton);
    }

    render(element: HTMLElement): void {
        element.appendChild(this.element);
    }

    createElement(title, className, rightButton, leftButton): HTMLElement {
        var header = Component.createDiv();
        header.className = 'ochat-header ' + className;

        var titleElem = Component.createSpan();
        titleElem.className = 'ochat-header-title';
        titleElem.innerText = title;
        header.appendChild(titleElem);

        if (rightButton) {
            rightButton.addClass('ochat-right');
            header.appendChild(rightButton.element);
        }
        if (leftButton) {
            rightButton.addClass('ochat-left');
            header.appendChild(leftButton.element);
        }
        return header;
    }
}