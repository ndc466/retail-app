/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Component} from "../component";
import {loadingTemplate} from "../../templates/src/loading/loading.template.thml";

export class LoadingComponent extends Component {
    static LOADING_ID = 'ochat_loading';
    static LOADING_CONTENT_ID = 'ochat-loading-content';

    content: HTMLElement;

    constructor() {
        super();
        this.hide();
    }

    render(element): void {

    }

    createElement(): HTMLElement {
        var div = Component.createHTML(loadingTemplate);
        this.content = <HTMLElement>div.getElementsByClassName(LoadingComponent.LOADING_CONTENT_ID)[0];
        return div;
    }

    present(message: string) {
        this.hide(false);
        this.setContent(message);
    }

    dismiss() {
        this.hide();
        this.setContent('');
    }

    getContentElement(): HTMLElement {
        return this.element;
    }

    setContent(message: string) {
        this.content.innerHTML = message;
    }

    //
    // setDisplay(show: boolean = true){
    //     var loading = document.getElementById(LoadingComponent.LOADING_ID);
    //     loading.style.display = show ? 'flex' : 'none';
    // }
}