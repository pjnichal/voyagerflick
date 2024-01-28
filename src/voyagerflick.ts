import net from "net";
import { HttpRequestParser } from "./utils/HttpRequestParser";
import { HttpResponse } from "./utils/HttpResponse";
import { RouteStore } from "./helpers/RouteStore";
import { HttpRequest } from "./utils/HttpRequest";
import { RequestHandler } from "./helpers/RequestHandler";

class VoyagerFlick {
  routeStore = RouteStore.getInstance();
  rawRequest = new HttpRequestParser();
  requestHandler = RequestHandler.getInstance();
  public listen(port: number, callback: Function) {
    const tcpServer = net.createServer((socket) => {
      socket.on("data", (data) => {
        const httpRequest = this.rawRequest.parse(data.toString());
        let response = this.requestHandler.handleGetRequest(httpRequest);
        socket.write(response);
        socket.end();
      });
      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
    });
    tcpServer.listen(port, () => {
      callback();
    });
  }
  public get(
    path: string,
    method: (req: HttpRequest, res: HttpResponse) => void
  ) {
    this.routeStore.addGetRoute(path, method);
  }
  public post(
    path: string,
    method: (req: HttpRequest, res: HttpResponse) => void
  ) {
    this.routeStore.addPostRoute(path, method);
  }
  public patch(
    path: string,
    method: (req: HttpRequest, res: HttpResponse) => void
  ) {
    this.routeStore.addPatchRoute(path, method);
  }
  public delete(
    path: string,
    method: (req: HttpRequest, res: HttpResponse) => void
  ) {
    this.routeStore.addDeleteRoute(path, method);
  }
  public put(
    path: string,
    method: (req: HttpRequest, res: HttpResponse) => void
  ) {
    this.routeStore.addPutRoute(path, method);
  }
}
export const voyagerflick = (): VoyagerFlick => {
  let voyagerflickServer;
  if (voyagerflickServer) {
    return voyagerflickServer;
  }
  voyagerflickServer = new VoyagerFlick();
  return voyagerflickServer;
};
