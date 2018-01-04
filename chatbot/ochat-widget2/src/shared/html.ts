/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */

import {Component} from "../component";

/**
 *  <div>
 *      HTML
 *  </div>
 */
export class HTML extends Component {

    constructor(private html: string,
                private className: string = null) {
        super();
    }

    render(element: HTMLElement): void {
        element.appendChild(this.element);
    }

    createElement(): HTMLElement {
        var div = Component.createDiv();
        if (this.className) {
            div.className = this.className;
        }
        div.innerHTML = this.html;
        return div;
    }

}