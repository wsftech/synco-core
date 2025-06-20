import {match, match as pathMatch} from "path-to-regexp";
import { RouteDefinition } from "../types/types";

export class Router {
    private routes: RouteDefinition[] = [];

    register(route: RouteDefinition) {
        this.routes.push(route);
    }

    match(method: string, path: string): RouteDefinition | undefined {
        const cleanPath = this.normalizePath(path);
        return this.routes.find((r) => {
            const routePath = this.normalizePath(r.path);
            const matcher = pathMatch(routePath, { end: true });
            return matcher(cleanPath) !== false && r.method === method;
        });
    }

    extractParams(template: string, actual: string): Record<string, string> {
        const matcher = match(template, { decode: decodeURIComponent });
        const result = matcher(actual) as any;
        return result?.params || {};
    }

    getRoutes() {
        return this.routes;
    }

    private normalizePath(path: string): string {
        if (path === "/") return path;
        return path.replace(/\/+$/, ""); // remove apenas barras no final
    }

}
