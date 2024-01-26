import net from "net";
import { HttpRequestParser } from "./utils/HttpRequestParser";
import { HttpResponse } from "./utils/HttpResponse";
import { RouteStore } from "./helpers/RouteStore";

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
          if (httpResponse.type == "application/json") {
            response = `HTTP/1.1 ${httpResponse.status} OK\r\nContent-Type: ${
              httpResponse.type
            }\r\n\r\n${JSON.stringify(httpResponse.body)}\r\n`;
          } else {
            response = `HTTP/1.1 ${httpResponse.status} OK\r\nContent-Type: ${httpResponse.type}\r\n\r\n${httpResponse.body}\r\n`;
          }
        }
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
  public get(path: string, method: Function) {
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
