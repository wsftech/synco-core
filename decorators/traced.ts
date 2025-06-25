export const Traced = (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
        const start = performance.now();
        const className = target.constructor.name;

        try {
            const result = await originalMethod.apply(this, args);
            const duration = performance.now() - start;

            if (duration > 100) { // Log slow operations
                console.warn(`SLOW: ${className}.${propertyName} took ${duration.toFixed(2)}ms`);
            }

            return result;
        } catch (error) {
            console.error(`ERROR in ${className}.${propertyName}:`, error);
            throw error;
        }
    };
};