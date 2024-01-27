import net from "net";
import { HttpRequestParser } from "./utils/HttpRequestParser";
import { HttpResponse } from "./utils/HttpResponse";
import { RouteStore } from "./helpers/RouteStore";
import { HttpRequest } from "./utils/HttpRequest";
import { GetRequestHandler } from "./helpers/GetRequestHandler";

class VoyagerFlick {
  routeStore = RouteStore.getInstance();
  rawRequest = new HttpRequestParser();
  public listen(port: number, callback: Function) {
    const tcpServer = net.createServer((socket) => {
      console.log("Client connected.");

      socket.on("data", (data) => {
        const httpRequest = this.rawRequest.parse(data.toString());
        let response = "";
        switch (httpRequest.method) {
          case "GET":
            response =
              GetRequestHandler.getInstance().handleGetRequest(httpRequest);
            break;
          default:
            response = `HTTP/1.1 404 SORRY_MATE\r\nContent-Type: text/plain\r\n\r\nHaven't handle this case mate\r\n`;
            break;
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
