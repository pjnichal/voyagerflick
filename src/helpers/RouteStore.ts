interface IRouteStore {
  addGetRoute(key: string, value: Function): void;
  addPostRoute(key: string, value: Function): void;
  addPatchRoute(key: string, value: Function): void;
  addDeleteRoute(key: string, value: Function): void;
  addPutRoute(key: string, value: Function): void;
}

export class RouteStore implements IRouteStore {
  private static instance: RouteStore;
  private records: Record<string, Record<string, Function>> = {};

  private constructor() {}
  addPostRoute(key: string, value: Function): void {
    if (!this.records["POST"]) {
      this.records["POST"] = {};
    }
    this.records["POST"][key] = value;
  }
  addPatchRoute(key: string, value: Function): void {
    if (!this.records["PATCH"]) {
      this.records["PATCH"] = {};
    }
    this.records["PATCH"][key] = value;
  }
  addDeleteRoute(key: string, value: Function): void {
    if (!this.records["DELETE"]) {
      this.records["DELETE"] = {};
    }
    this.records["DELETE"][key] = value;
  }
  addPutRoute(key: string, value: Function): void {
    if (!this.records["PUT"]) {
      this.records["PUT"] = {};
    }
    this.records["PUT"][key] = value;
  }

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
