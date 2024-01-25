import { hostname } from "os";
import { ServerProps } from "./types/alltypes";
import net from "net";
import { HttpRequestParser } from "./utils/HttpRequestParser";
import { HttpResponse } from "./utils/HttpResponse";
import { HttpRequest } from "./utils/HttpRequest";
let voyagerflickServer: VoyagerFlick;
class VoyagerFlick {
  routeStore = RouteStore.getInstance();
  public listen(port: string, callback: Function) {
    const tcpServer = net.createServer((socket) => {
      console.log("Client connected.");

      socket.on("data", (data) => {
        const rawRequest = new HttpRequestParser();

        rawRequest.parse(data.toString());

        const httpRequest = new HttpRequest();
        httpRequest.buildRequest({
          body: rawRequest.getBody(),
          headers: rawRequest.getHeaders(),
          method: rawRequest.getMethod(),
          path: rawRequest.getPath(),
          version: rawRequest.getVersion(),
        });
        let httpResponse = new HttpResponse();
        let response = `HTTP/1.1 404 OK\r\nContent-Type: text/plain\r\n\r\nCan't ${httpRequest.method} to ${httpRequest.path}\r\n`;
        if (this.routeStore.getRoute(httpRequest.path)) {
          this.server.get[httpRequest.path](httpRequest, httpResponse);
          if (httpResponse.type == "application/json") {
            response = `HTTP/1.1 ${httpResponse.status} OK\r\nContent-Type: ${
              httpResponse.type
            }\r\n\r\n${JSON.stringify(httpResponse.body)}\r\n`;
          } else {
            response = `HTTP/1.1 ${httpResponse.status} OK\r\nContent-Type: ${httpResponse.type}\r\n\r\n${httpResponse.body}\r\n`;
          }
        } else {
          socket.write(response);
          socket.end();
        }
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
    this.server.get[path] = method;
  }
  public post(path: string, method: Function) {
    this.server.post[path] = method;
  }
  public testrun(path: string) {
    const fun = this.server.get[path];
    fun();
  }
}
export const voyagerflick = () => {
  if (voyagerflickServer) {
    return voyagerflickServer;
  }
  voyagerflickServer = new VoyagerFlick();
  return voyagerflickServer;
};
