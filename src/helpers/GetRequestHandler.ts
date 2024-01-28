import { HttpRequest } from "../utils/HttpRequest";
import { HttpResponse } from "../utils/HttpResponse";
import { HttpResponseGenerator } from "./HttpResponseGenerator";
import { RouteStore } from "./RouteStore";

export class GetRequestHandler {
  routeStore = RouteStore.getInstance();
  responseGenerator = HttpResponseGenerator.getInstance();
  private static instance: GetRequestHandler;
  public static getInstance(): GetRequestHandler {
    if (!GetRequestHandler.instance) {
      GetRequestHandler.instance = new GetRequestHandler();
    }
    return GetRequestHandler.instance;
  }

  public handleGetRequest(httpRequest: HttpRequest) {
    let httpResponse = new HttpResponse();
    if (this.routeStore.getGetRoute(httpRequest.path)) {
      this.routeStore.getGetRoute(httpRequest.path)(httpRequest, httpResponse);
      return this.responseGenerator.responseGenerator(httpResponse);
    }
    return this.responseGenerator.routeNotFoundResponse(httpRequest);
  }
}
