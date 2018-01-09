/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Settings} from "./settings";
import {Logger} from "./logger";
import {Utils} from "./utils";
import {DataService} from "./data-service";
import {WidgetComponent} from "./widget/widget.component";
import {widgetStyle} from "../templates/src/widget/widget.template.thml";

declare const ochatWidgetSettings: any;

export class Main {
    onLoad() {
        let settings = new Settings(ochatWidgetSettings);
        let logger = new Logger(settings);
        let utils = new Utils();
        let dataService = new DataService(settings, logger);

        if (!settings.useCustomStyle) {
            document.head.innerHTML += widgetStyle;
        }

        let widgetComponent = new WidgetComponent(settings, utils, logger, dataService);
        widgetComponent.appendToElement(document.body);
    }
}

let main = new Main();
if(document.addEventListener) {
    document.addEventListener('DOMContentLoaded', main.onLoad.bind(main), false);
} else {
    window.addEventListener('load', main.onLoad.bind(main), false )
}
