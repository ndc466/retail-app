/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */

import {Component} from "../component";
import {Settings} from "../settings";
import {Utils} from "../utils";
import {Logger} from "../logger";
import {DataService} from "../data-service";
import {LoadingComponent} from "../loading/loading.component";
import {MiniComponent} from "../mini/mini.component";
import {ChatComponent} from "../chat/chat.component";

/**
 * <div class="ochat-widget ochat-widget-mini">
 *     {content}
 * </div>
 */
export class WidgetComponent extends Component {
    chatComponent: Component;
    miniComponent: Component;
    loadingComponent: LoadingComponent;

    constructor(private settings: Settings,
                private utils: Utils,
                private logger: Logger,
                private dataService: DataService) {
        super(settings, utils, logger, dataService);
    }

    render(element): void {

    }

    createElement(settings, utils, logger, dataService): HTMLElement {
        var div = Component.createDiv();
        div.className = 'ochat-widget ochat-widget-mini';

        if (settings.position.bottom) {
            div.style.bottom = settings.position.bottom;
        }
        if (settings.position.left) {
            div.style.left = settings.position.left;
        }
        if (settings.position.top) {
            div.style.top = settings.position.top;
        }
        if (settings.position.right) {
            div.style.right = settings.position.right;
        }

        this.loadingComponent = new LoadingComponent();
        div.appendChild(this.loadingComponent.element);

        this.miniComponent = new MiniComponent(settings, () => this.showChat(true));
        div.appendChild(this.miniComponent.element);
        return div;
    }

    showChat(show) {
        if (show) {
            setTimeout(() => {
                this.chatComponent = new ChatComponent(this.dataService, this.settings, this.utils, this.logger, this.loadingComponent, () => this.showChat(false));
                this.element.appendChild(this.chatComponent.element);
            }, 500);

            this.element.className = this.element.className.replace(' ochat-widget-mini', '');
        } else {
            this.chatComponent.remove();
            this.element.className += ' ochat-widget-mini';
        }
    }
}