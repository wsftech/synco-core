import "reflect-metadata";

export function Query(paramName?: string): ParameterDecorator {
    return (target: any, propertyKey: any, parameterIndex: number) => {
        const existingParams = Reflect.getMetadata("route:params", target[propertyKey], "") || [];
        existingParams.push({ type: "query", index: parameterIndex, name: paramName });
        Reflect.defineMetadata("route:params", existingParams, target[propertyKey], "");
    };
}