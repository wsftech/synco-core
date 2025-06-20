import "reflect-metadata";

export function Body(): ParameterDecorator {
    return (target: any, propertyKey: any, parameterIndex) => {
        const existingParams = Reflect.getMetadata("route:params", target[propertyKey], "") || [];
        existingParams.push({ type: "body", index: parameterIndex });
        Reflect.defineMetadata("route:params", existingParams, target[propertyKey], "");
    };
}