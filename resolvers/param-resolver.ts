export class ParameterResolver {
    static async resolve(handler: Function, req: Request, pathParams: any): Promise<any[]> {
        const paramMetadata: any[] = Reflect.getMetadata("route:params", handler, "") || [];
        const uploadParams = Reflect.getMetadata("upload:params", handler) || [];

        const args: any[] = [];

        let formData: FormData | null = null;
        const filesMap = new Map<number, File[]>();

        if (uploadParams.length > 0) {
            formData = await req.formData();
            for (const param of uploadParams) {
                const files = formData.getAll(param.fieldName).filter(f => f instanceof File);
                filesMap.set(param.index, files);
            }
        }

        let bodyData = null;
        if (paramMetadata.some(p => p.type === "body")) {
            try {
                bodyData = await req.json();
            } catch {}
        }

        const url = new URL(req.url);

        for (const param of paramMetadata) {
            if (filesMap.has(param.index)) {
                args[param.index] = filesMap.get(param.index);
                continue;
            }

            switch (param.type) {
                case "param":
                    args[param.index] = pathParams[param.name];
                    break;
                case "body":
                    args[param.index] = bodyData;
                    break;
                case "query":
                    args[param.index] = param.name
                        ? url.searchParams.get(param.name)
                        : Object.fromEntries(url.searchParams.entries());
                    break;
                case "header":
                    args[param.index] = param.name
                        ? req.headers.get(param.name)
                        : Object.fromEntries(req.headers.entries());
                    break;
                case "req":
                    args[param.index] = req;
                    break;
                case "res":
                    args[param.index] = Response;
                    break;
            }
        }

        return args;
    }
}
