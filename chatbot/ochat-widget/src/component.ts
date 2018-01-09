/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
export abstract class Component {
    element: HTMLElement;
    display: string;

    constructor(...optionalParams: any[]) {
        this.element = this.createElement.apply(this, arguments);
    }

    abstract render(element: HTMLElement): void;

    abstract createElement(...optionalParams: any[]): HTMLElement;

    addClass(className: string): void {
        this.element.className += ' ' + className;
    };

    hide(hide: boolean = true) {
        if (hide) {
            this.display = this.element.style.display;
            this.element.style.display = 'none';
        } else {
            this.element.style.display = this.display;
        }
    }

    remove() {
        this.element.remove();
    }

    appendToComponent(component: Component) {
        component.element.appendChild(this.element);
    }

    prependToComponent(component: Component) {
        var firstChild = component.element.firstChild;
        if (firstChild) {
            component.element.insertBefore(firstChild, this.element);
        } else {
            component.element.appendChild(this.element);
        }
    }

    appendToElement(element: HTMLElement) {
        element.appendChild(this.element);
    }

    prependToElement(element: HTMLElement) {
        var firstChild = element.firstChild;
        if (firstChild) {
            element.insertBefore(this.element, firstChild);
        } else {
            element.appendChild(this.element);
        }
    }

    appendContentChildElement(child: HTMLElement) {
        this.getContentElement().appendChild(child);
    }

    appendContentChild(child: Component) {
        this.getContentElement().appendChild(child.element);
    }

    prependContentChild(child: Component) {
        var content = this.getContentElement();
        var firstChild = content.firstChild;
        if (firstChild) {
            content.insertBefore(child.element, firstChild);
        } else {
            content.appendChild(child.element);
        }
    }

    getContentElement(): HTMLElement {
        return this.element;
    }

    static createButton(): HTMLButtonElement {
        return (<HTMLButtonElement>document.createElement('button'));
    }

    static createAnchor(): HTMLAnchorElement {
        return (<HTMLAnchorElement>document.createElement('a'));
    }

    static createDiv(): HTMLDivElement {
        return (<HTMLDivElement>document.createElement('div'));
    }

    static createSpan(): HTMLSpanElement {
        return (<HTMLSpanElement>document.createElement('span'));
    }

    static createInput(): HTMLInputElement {
        return (<HTMLInputElement>document.createElement('input'));
    }

    static createHTML(html: string): HTMLDivElement {
        var div = Component.createDiv();
        div.innerHTML = html;
        return div;
    }

    static getElementByClassName(element: HTMLElement, className: string) {
        var elements = element.getElementsByClassName(className);
        return elements && elements.length > 0 ? <HTMLElement>elements[0] : null;
    }
}