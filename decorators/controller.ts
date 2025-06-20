import "reflect-metadata";

export function Controller(prefix: string = ''): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('prefix', `/${prefix.replace(/^\/|\/$/g, '')}`, target);
    };
}
