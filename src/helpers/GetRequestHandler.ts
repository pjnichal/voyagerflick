import { HttpRequest } from "../utils/HttpRequest";
import { HttpResponse } from "../utils/HttpResponse";
import { RouteStore } from "./RouteStore";

export class GetRequestHandler {
  routeStore = RouteStore.getInstance();
  private static instance: GetRequestHandler;
  public static getInstance(): GetRequestHandler {
    if (!GetRequestHandler.instance) {
      GetRequestHandler.instance = new GetRequestHandler();
    }
    return GetRequestHandler.instance;
  }

  public handleGetRequest(httpRequest: HttpRequest) {
    let httpResponse = new HttpResponse();
    this.routeStore.getRoute(httpRequest.path)(httpRequest, httpResponse);
    return `HTTP/1.1 ${httpResponse.statusCode} OK\r\nContent-Type: ${httpResponse.type}\r\n\r\n${httpResponse.body}\r\n`;
  }
}
