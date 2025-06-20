import "reflect-metadata";

export function Method(method: string, path: string): MethodDecorator {
    return (target, propertyKey) => {
        Reflect.defineMetadata("method", method, target, propertyKey);
        Reflect.defineMetadata("route", path, target, propertyKey);
    };
}