import "reflect-metadata";

class DependencyContainer {
    private instances = new Map<Function, any>();

    register<T>(token: new (...args: any[]) => T, instance?: T): void {
        if (!this.instances.has(token)) {
            this.instances.set(token, instance ?? this.resolve(token));
        }
    }

    resolve<T>(target: new (...args: any[]) => T): T {
        if (this.instances.has(target)) {
            return this.instances.get(target);
        }

        const dependencies = Reflect.getMetadata("design:paramtypes", target) || [];
        const injections = dependencies.map((dep: any) => this.resolve(dep));

        const instance = new target(...injections);
        this.instances.set(target, instance);
        return instance;
    }
}

export const container = new DependencyContainer();
