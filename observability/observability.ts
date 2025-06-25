// core/observability.ts
interface RequestContext {
    id: string;
    startTime: number;
    method: string;
    path: string;
    userId?: string;
}

export class ObservabilityManager {
    private activeRequests = new Map<string, RequestContext>();
    private metrics = {
        requestCount: 0,
        errorCount: 0,
        avgResponseTime: 0,
        memoryUsage: 0
    };

    startRequest(req: Request): string {
        const id = crypto.randomUUID();
        const context: RequestContext = {
            id,
            startTime: performance.now(),
            method: req.method,
            path: new URL(req.url).pathname
        };

        this.activeRequests.set(id, context);
        this.metrics.requestCount++;

        console.log(`[${id}] START ${context.method} ${context.path}`);
        return id;
    }

    endRequest(id: string, status: number, error?: Error) {
        const context = this.activeRequests.get(id);
        if (!context) return;

        const duration = performance.now() - context.startTime;
        this.updateMetrics(duration, status >= 400);

        console.log(`[${id}] END ${status} ${duration.toFixed(2)}ms`);

        if (error) {
            console.error(`[${id}] ERROR:`, error.message);
            this.metrics.errorCount++;
        }

        this.activeRequests.delete(id);
    }

    private updateMetrics(duration: number, isError: boolean) {
        // Simple moving average
        this.metrics.avgResponseTime =
            (this.metrics.avgResponseTime + duration) / 2;

        // Memory usage
        this.metrics.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    }

    getMetrics() {
        return {
            ...this.metrics,
            activeRequests: this.activeRequests.size,
            uptime: process.uptime()
        };
    }
}