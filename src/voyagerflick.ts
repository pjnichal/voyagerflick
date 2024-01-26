import net from "net";
import { HttpRequestParser } from "./utils/HttpRequestParser";
import { HttpResponse } from "./utils/HttpResponse";
import { RouteStore } from "./helpers/RouteStore";
import { HttpRequest } from "./utils/HttpRequest";

class VoyagerFlick {
  routeStore = RouteStore.getInstance();
  rawRequest = new HttpRequestParser();
  public listen(port: number, callback: Function) {
    const tcpServer = net.createServer((socket) => {
      console.log("Client connected.");

      socket.on("data", (data) => {
        const httpRequest = this.rawRequest.parse(data.toString());
        let httpResponse = new HttpResponse();
        let response = `HTTP/1.1 404 OK\r\nContent-Type: text/plain\r\n\r\nCan't ${httpRequest.method} to ${httpRequest.path}\r\n`;
        if (this.routeStore.getRoute(httpRequest.path)) {
          this.routeStore.getRoute(httpRequest.path)(httpRequest, httpResponse);
          response = `HTTP/1.1 ${httpResponse.statusCode} OK\r\nContent-Type: ${httpResponse.type}\r\n\r\n${httpResponse.body}\r\n`;
        }
        console.log(response);
        socket.write(response);
        socket.end();
      });

      socket.on("end", () => {
        console.log("Client disconnected.");
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
    this.routeStore.addRoute(path, method);
  }
}
export const voyagerflick = () => {
  let voyagerflickServer;
  if (voyagerflickServer) {
    return voyagerflickServer;
  }
  voyagerflickServer = new VoyagerFlick();
  return voyagerflickServer;
};
