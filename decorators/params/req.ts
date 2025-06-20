import "reflect-metadata";

export function Req(): ParameterDecorator {
    return (target: any, propertyKey: any, parameterIndex: number) => {
        const existingParams = Reflect.getMetadata("route:params", target[propertyKey], "") || [];
        existingParams.push({ type: "req", index: parameterIndex });
        Reflect.defineMetadata("route:params", existingParams, target[propertyKey], "");
    };
}