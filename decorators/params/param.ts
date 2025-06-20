import "reflect-metadata";

export function Param(name: string): ParameterDecorator {
    return (target: any, propertyKey: any, parameterIndex: number) => {
        const existingParams = Reflect.getMetadata("route:params", target[propertyKey], "") || [];
        existingParams.push({ type: "param", name, index: parameterIndex });
        Reflect.defineMetadata("route:params", existingParams, target[propertyKey], "");
    };
}