/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";
import {choicesTemplate} from "../../templates/src/chat/choices.template.thml";
import {Button} from "../shared/button";

export class ChoicesComponent extends Component {
    choicesElement: any;

    constructor(choices: Array<any>, private onClick: Function) {
        super();
        this.choicesElement = document.createElement('div');
        this.choicesElement.innerHTML = choicesTemplate;
        var listElement = this.choicesElement.getElementsByClassName('ochat-choices-list');
        choices.forEach(choice => {
            var btn = new Button(this.onClick.bind(this, this), choice);
            btn.render(listElement[0]);
        });
    }

    render(element: any): void {
        element.appendChild(this.choicesElement);
    }

    createElement(): HTMLElement {
        return undefined;
    }

    remove() {
        this.choicesElement.parentNode.removeChild(this.choicesElement);
    }
}