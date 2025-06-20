import "reflect-metadata";

export function createMethodDecorator(method: string) {
    return function (path?: string): MethodDecorator {
        return function (
            target: Object,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ): void {
            Reflect.defineMetadata("method", method, target, propertyKey);
            Reflect.defineMetadata("route", path ?? "/", target, propertyKey);
        };
    };
}