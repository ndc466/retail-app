/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */
import {Settings} from "./settings";

export class Logger {

    prefix: string;

    constructor(private settings: Settings) {
        this.prefix = '[' + settings.name + ']';
        this.info('version:', settings.version);
    }

    info(message?: any, ...optionalParams: any[]) {
        if (this.settings.isDebugMode) {
            optionalParams.unshift(message);
            console.info(this.prefix, optionalParams);
        }
    }

    error(message?: any, ...optionalParams: any[]) {
        optionalParams.unshift(message);
        console.error(this.prefix, optionalParams);
    }

    verbose(message?: any, ...optionalParams: any[]) {
        if (this.settings.isDebugMode) {
            optionalParams.unshift(message);
            console.debug(this.prefix, optionalParams);
        }
    }
}