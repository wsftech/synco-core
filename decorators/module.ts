import "reflect-metadata";
import {ModuleMetadata} from "core/interfaces/synco.interface";

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata("module:imports", metadata.imports ?? [], target);
        Reflect.defineMetadata("module:controllers", metadata.controllers ?? [], target);
        Reflect.defineMetadata("module:providers", metadata.providers ?? [], target);
        Reflect.defineMetadata("module:exports", metadata.exports ?? [], target);
    };
}