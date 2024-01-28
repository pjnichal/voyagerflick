import { HttpRequest } from "../utils/HttpRequest";
import { HttpResponse } from "../utils/HttpResponse";
import { HttpResponseGenerator } from "./HttpResponseGenerator";
import { RouteStore } from "./RouteStore";

export class RequestHandler {
  routeStore = RouteStore.getInstance();
  responseGenerator = HttpResponseGenerator.getInstance();
  private static instance: RequestHandler;
  public static getInstance(): RequestHandler {
    if (!RequestHandler.instance) {
      RequestHandler.instance = new RequestHandler();
    }
    return RequestHandler.instance;
  }

  public handleGetRequest(httpRequest: HttpRequest): string {
    let httpResponse = new HttpResponse();
    let response;
    switch (httpRequest.method) {
      case "GET":
        if (this.routeStore.getGetRoute(httpRequest.path)) {
          this.routeStore.getGetRoute(httpRequest.path)(
            httpRequest,
            httpResponse
          );
          response = this.responseGenerator.responseGenerator(httpResponse);
        } else {
          response = `HTTP/1.1 404 ROUTE_NOT_FOUND\r\nContent-Type: text/plain\r\n\r\n Can't ${httpRequest.method} to ${httpRequest.path}\r\n`;
        }
        break;
      case "POST":
        if (this.routeStore.getPostRoute(httpRequest.path)) {
          this.routeStore.getPostRoute(httpRequest.path)(
            httpRequest,
            httpResponse
          );
          response = this.responseGenerator.responseGenerator(httpResponse);
        } else {
          response = `HTTP/1.1 404 ROUTE_NOT_FOUND\r\nContent-Type: text/plain\r\n\r\n Can't ${httpRequest.method} to ${httpRequest.path}\r\n`;
        }
        break;
      case "PUT":
        if (this.routeStore.getPutRoute(httpRequest.path)) {
          this.routeStore.getPutRoute(httpRequest.path)(
            httpRequest,
            httpResponse
          );
          response = this.responseGenerator.responseGenerator(httpResponse);
        } else {
          response = `HTTP/1.1 404 ROUTE_NOT_FOUND\r\nContent-Type: text/plain\r\n\r\n Can't ${httpRequest.method} to ${httpRequest.path}\r\n`;
        }
        break;
      case "PATCH":
        if (this.routeStore.getPatchRoute(httpRequest.path)) {
          this.routeStore.getPatchRoute(httpRequest.path)(
            httpRequest,
            httpResponse
          );
          response = this.responseGenerator.responseGenerator(httpResponse);
        } else {
          response = `HTTP/1.1 404 ROUTE_NOT_FOUND\r\nContent-Type: text/plain\r\n\r\n Can't ${httpRequest.method} to ${httpRequest.path}\r\n`;
        }
        break;
      case "DELETE":
        if (this.routeStore.getDeleteRoute(httpRequest.path)) {
          this.routeStore.getDeleteRoute(httpRequest.path)(
            httpRequest,
            httpResponse
          );
          response = this.responseGenerator.responseGenerator(httpResponse);
        } else {
          response = `HTTP/1.1 404 ROUTE_NOT_FOUND\r\nContent-Type: text/plain\r\n\r\n Can't ${httpRequest.method} to ${httpRequest.path}\r\n`;
        }
        break;
      default:
        response = `HTTP/1.1 404 SORRY_MATE\r\nContent-Type: text/plain\r\n\r\nHaven't handle this case mate\r\n`;
    }

    return response;
  }
}
