import {Router} from "../router/router";
import {ParameterResolver} from "../resolvers/param-resolver";


export class RequestHandler {
    constructor(private readonly router: Router) {}

    async handle(req: Request): Promise<Response> {
        const url = new URL(req.url);
        const route = this.router.match(req.method, url.pathname);

        if (!route) {
            return new Response("Not Found", { status: 404 });
        }

        try {
            const pathParams = this.router.extractParams(route.path, url.pathname);
            const args = await ParameterResolver.resolve(route.originalHandler, req, pathParams);

            const result = await route.handler.apply(route.instance, args);

            if (result instanceof Response) return result;

            return new Response(JSON.stringify(result), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (err) {
            console.error("[SyncoJS Error]", err);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
}
