export function Header(headerName?: string): ParameterDecorator {
    return (target: any, propertyKey: any, parameterIndex: number) => {
        const existingParams = Reflect.getMetadata("route:params", target[propertyKey], "") || [];
        existingParams.push({ type: "header", index: parameterIndex, name: headerName });
        Reflect.defineMetadata("route:params", existingParams, target[propertyKey], "");
    };
}