import "reflect-metadata";

export function Res(): ParameterDecorator {
    return (target: any, propertyKey: any, parameterIndex: number) => {
        const existingParams = Reflect.getMetadata("route:params", target[propertyKey], "") || [];
        existingParams.push({ type: "res", index: parameterIndex });
        Reflect.defineMetadata("route:params", existingParams, target[propertyKey], "");
    };
}