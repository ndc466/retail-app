/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";

/**
 *  <div class="ochat-footer">
 *      <div class="ochat-toolbar">
 *          {content}
 *      </div>
 *  </div>
 */
export class Footer extends Component {

    content: HTMLElement;

    constructor(private className: string = '') {
        super(className);
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    createElement(className): HTMLElement {
        var footer = Component.createDiv();
        footer.className = 'ochat-footer ' + this.className;
        var toolbar = Component.createDiv();
        toolbar.className = 'ochat-toolbar';
        footer.appendChild(toolbar);

        this.content = toolbar;
        return footer;
    }

    getContentElement(): HTMLElement {
        return this.content;
    }

}