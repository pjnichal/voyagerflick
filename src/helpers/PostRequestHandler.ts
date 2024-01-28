import { HttpRequest } from "../utils/HttpRequest";
import { HttpResponse } from "../utils/HttpResponse";
import { HttpResponseGenerator } from "./HttpResponseGenerator";
import { RouteStore } from "./RouteStore";

export class PostRequestHandler {
  routeStore = RouteStore.getInstance();
  responseGenerator = HttpResponseGenerator.getInstance();
  private static instance: PostRequestHandler;
  public static getInstance(): PostRequestHandler {
    if (!PostRequestHandler.instance) {
      PostRequestHandler.instance = new PostRequestHandler();
    }
    return PostRequestHandler.instance;
  }

  public handlePostRequest(httpRequest: HttpRequest) {
    let httpResponse = new HttpResponse();
    if (this.routeStore.getPostRoute(httpRequest.path)) {
      this.routeStore.getPostRoute(httpRequest.path)(httpRequest, httpResponse);
      return this.responseGenerator.responseGenerator(httpResponse);
    }
    return this.responseGenerator.routeNotFoundResponse(httpRequest);
  }
}
