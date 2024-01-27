import { HttpRequest } from "../utils/HttpRequest";
import { HttpResponse } from "../utils/HttpResponse";
import { RouteStore } from "./RouteStore";

export class HttpResponseGenerator {
  private static instance: HttpResponseGenerator;

  public static getInstance(): HttpResponseGenerator {
    if (!HttpResponseGenerator.instance) {
      HttpResponseGenerator.instance = new HttpResponseGenerator();
    }
    return HttpResponseGenerator.instance;
  }
  public routeNotFoundResponse(httpRequest: HttpRequest) {
    return `HTTP/1.1 404 ROUTE_NOT_FOUND\r\nContent-Type: text/plain\r\n\r\nCan't ${httpRequest.method} to ${httpRequest.path}\r\n`;
  }

  public responseGenerator(httpResponse: HttpResponse) {
    return `HTTP/1.1 ${httpResponse.statusCode} OK\r\nContent-Type: ${httpResponse.type}\r\n\r\n${httpResponse.body}\r\n`;
  }
}
