export class RouteStore {
  private static instance: RouteStore;
  private records: Record<string, Record<string, Function>> = {};

  private constructor() {}

  public static getInstance(): RouteStore {
    if (!RouteStore.instance) {
      RouteStore.instance = new RouteStore();
    }
    return RouteStore.instance;
  }

  public addGetRoute(key: string, value: Function): void {
    if (!this.records["GET"]) {
      this.records["GET"] = {};
    }
    this.records["GET"][key] = value;
  }

  public getGetRoute(key: string): Function {
    return this.records["GET"][key];
  }

  public getAllRoutes(): Record<string, Record<string, Function>> {
    return this.records;
  }

  public removeRoute(key: string): void {
    delete this.records[key];
  }
}
