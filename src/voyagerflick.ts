import { hostname } from "os";
import { ServerProps } from "./types/serverprops";
import net from "net";
import { HttpRequestParser } from "./utils/HttpRequestParser";
import { HttpResponse } from "./utils/HttpResponse";
import { HttpRequest } from "./utils/HttpRequest";
let voyagerflickServer: VoyagerFlick;
class VoyagerFlick {
  server: ServerProps;
  constructor() {
    this.server = { get: {}, post: {} };
  }

  public listen(port: string, callback: Function) {
    const tcpServer = net.createServer((socket) => {
      console.log("Client connected.");

      socket.on("data", (data) => {
        const parser = new HttpRequestParser();

        parser.parse(data.toString());

        const httpRequest = new HttpRequest();
        httpRequest.buildRequest(parser.getBody(), parser.getHeaders());
        let httpResponse = new HttpResponse();
        if (this.server.get[parser.getPath()]) {
          this.server.get[parser.getPath()](httpRequest, httpResponse);
          console.log(JSON.stringify(httpResponse.body));
          if (httpResponse.type == "application/json") {
            const response = `HTTP/1.1 ${
              httpResponse.status
            } OK\r\nContent-Type: ${httpResponse.type}\r\n\r\n${JSON.stringify(
              httpResponse.body
            )}\r\n`;
            socket.write(response, "utf-8");
            socket.end();
          } else {
            const response = `HTTP/1.1 ${httpResponse.status} OK\r\nContent-Type: ${httpResponse.type}\r\n\r\n${httpResponse.body}\r\n`;

            socket.write(response, "utf-8");
            socket.end();
          }
        } else {
          const response = `HTTP/1.1 404 OK\r\nContent-Type: text/plain\r\n\r\nCan't ${parser.getMethod()} to ${parser.getPath()}\r\n`;
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
