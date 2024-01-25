export class RouteStore {
  private static instance: RouteStore;
  private records: Record<string, Function> = {};

  private constructor() {}

  public static getInstance(): RouteStore {
    if (!RouteStore.instance) {
      RouteStore.instance = new RouteStore();
    }
    return RouteStore.instance;
  }

  public addRoute(key: string, value: Function): void {
    this.records[key] = value;
  }

  public getRoute(key: string): Function {
    return this.records[key];
  }

  public getAllRoutes(): Record<string, Function> {
    return this.records;
  }

  public removeRoute(key: string): void {
    delete this.records[key];
  }
}
