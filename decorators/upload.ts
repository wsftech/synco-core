import "reflect-metadata";

export function Upload(type: string, name?: string): ParameterDecorator {
    return (target: any, propertyKey: any, parameterIndex: number) => {
        const existingParams = Reflect.getMetadata("route:params", target[propertyKey], "") || [];
        existingParams.push({ index: parameterIndex, type, name });
        Reflect.defineMetadata("route:params", existingParams, target[propertyKey], "");
    };
}