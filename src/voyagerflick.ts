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
    this.server = { getMapping: {}, postMapping: {} };
  }

  public listen(port: string, callback: Function) {
    const tcpServer = net.createServer((socket) => {
      console.log("Client connected.");

      socket.on("data", (data) => {
        // console.log(`Received data from client: ${data}`);
        const parser = new HttpRequestParser();

        parser.parse(data.toString());
        const httpRequest = new HttpRequest();
        httpRequest.buildRequest(parser.getBody());
        let httpResponse = new HttpResponse();
        if (this.server.getMapping[parser.getPath()]) {
          this.server.getMapping[parser.getPath()](httpRequest, httpResponse);
          console.log(httpResponse.body, " ", httpResponse.status);
          console.log("HERE");
          const response = `HTTP/1.1 ${httpResponse.status} OK\r\nContent-Type: text/plain\r\n\r\n${httpResponse.body}\r\n`;
          console.log(response);
          socket.write(response, "utf-8");
          socket.end();
        } else {
          socket.write(`Server received: ${data}`);
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
    this.server.getMapping[path] = method;
  }
  public post(path: string, method: Function) {
    this.server.postMapping[path] = method;
  }
  public testrun(path: string) {
    const fun = this.server.getMapping[path];
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
