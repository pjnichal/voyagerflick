interface IRouteStore {
  addGetRoute(key: string, value: Function): void;
  addPostRoute(key: string, value: Function): void;
  addPatchRoute(key: string, value: Function): void;
  addDeleteRoute(key: string, value: Function): void;
  addPutRoute(key: string, value: Function): void;
  getGetRoute(key: string): Function;
  getPostRoute(key: string): Function;
  getDeleteRoute(key: string): Function;
  getPutRoute(key: string): Function;
  getPatchRoute(key: string): Function;
}

export class RouteStore implements IRouteStore {
  private static instance: RouteStore;
  private records: Record<string, Record<string, Function>> = {};

  public static getInstance(): RouteStore {
    if (!RouteStore.instance) {
      RouteStore.instance = new RouteStore();
    }
    return RouteStore.instance;
  }
  public getDeleteRoute(key: string): Function {
    return this.records["DELETE"][key];
  }
  public getPutRoute(key: string): Function {
    return this.records["PUT"][key];
  }
  public getPatchRoute(key: string): Function {
    return this.records["PATCH"][key];
  }
  public getGetRoute(key: string): Function {
    return this.records["GET"][key];
  }

  public getPostRoute(key: string): Function {
    return this.records["POST"][key];
  }

  public getAllRoutes(): Record<string, Record<string, Function>> {
    return this.records;
  }

  public addPostRoute(key: string, value: Function): void {
    if (!this.records["POST"]) {
      this.records["POST"] = {};
    }
    this.records["POST"][key] = value;
  }
  public addPatchRoute(key: string, value: Function): void {
    if (!this.records["PATCH"]) {
      this.records["PATCH"] = {};
    }
    this.records["PATCH"][key] = value;
  }
  public addDeleteRoute(key: string, value: Function): void {
    if (!this.records["DELETE"]) {
      this.records["DELETE"] = {};
    }
    this.records["DELETE"][key] = value;
  }
  public addPutRoute(key: string, value: Function): void {
    if (!this.records["PUT"]) {
      this.records["PUT"] = {};
    }
    this.records["PUT"][key] = value;
  }

  public addGetRoute(key: string, value: Function): void {
    if (!this.records["GET"]) {
      this.records["GET"] = {};
    }
    this.records["GET"][key] = value;
  }

  public removeRoute(key: string): void {
    delete this.records[key];
  }
}
