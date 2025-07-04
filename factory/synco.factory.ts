import chalk from "chalk";

import {Router} from "../router/router";
import {RequestHandler} from "../handlers/request";
import {container} from "../di/container";


export class SyncoFactory {
    private router = new Router();


    constructor(private readonly rootModule: any) {}

    async start(port = 3000) {
        new this.rootModule();
        const controllers: any[] = Reflect.getMetadata("module:controllers", this.rootModule) || [];

        for (const ControllerClass of controllers) {
            const prefix = Reflect.getMetadata("prefix", ControllerClass) ?? "";
            const controllerInstance: any = container.resolve(ControllerClass);
            const proto = Object.getPrototypeOf(controllerInstance);
            const methods = Object.getOwnPropertyNames(proto).filter(p => typeof controllerInstance[p] === "function" && p !== "constructor");

            for (const methodName of methods) {
                const routePath = Reflect.getMetadata("route", proto, methodName);
                const httpMethod = Reflect.getMetadata("method", proto, methodName) ?? "GET";

                if (routePath) {
                    this.router.register({
                        path: `${prefix}${routePath}`.replace(/\/+/g, "/"),
                        method: httpMethod,
                        handler: controllerInstance[methodName].bind(controllerInstance),
                        originalHandler: controllerInstance[methodName],
                        instance: controllerInstance,
                        set: undefined
                    });

                    console.log(
                        chalk.yellow(`[SyncoJS]`) +
                        " " +
                        chalk.gray(new Date().toLocaleString("pt-BR")) +
                        "     " +
                        chalk.green(`[RouterExplorer]`) +
                        ` Mapped {${prefix}${routePath}, ${httpMethod.toUpperCase()}} route`
                    );
                    console.log(`📊 Health check: http://localhost:${port}/health`);
                }
            }
        }

        const handler = new RequestHandler(this.router);

        Bun.serve({
            port,
            fetch: (req: Request) => handler.handle(req),
        });

        console.log(
            chalk.yellow(`[SyncoJS]`) +
            " " +
            chalk.gray(new Date().toLocaleString("pt-BR")) +
            "     " +
            chalk.cyanBright(`🚀 SyncoJS rodando em http://localhost:${port}`)
        );
    }
}
