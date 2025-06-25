export interface RouteDefinition {
    path: string;
    method: string;
    handler: Function;
    originalHandler: Function;
    instance: any;
    set: any;
}
