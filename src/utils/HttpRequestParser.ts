import { HttpRequest } from "./HttpRequest";

export class HttpRequestParser {
  private httpRequest: HttpRequest = new HttpRequest();

  parse(request: string): HttpRequest {
    const lines = request.split("\r\n");

    // Parse the request line
    const [method, path, version] = lines[0].split(" ");
    this.httpRequest.setMethod(method);
    this.httpRequest.setPath(path);
    this.httpRequest.setBody(version);
    // Parse headers
    let i = 1;
    let headers: Record<string, string> = {};
    while (lines[i] !== "") {
      const [headerName, headerValue] = lines[i].split(": ");
      headers[headerName.toLowerCase()] = headerValue;
      i++;
    }
    this.httpRequest.setHeaders(headers);
    // Parse the body
    let body = lines.slice(i + 1).join("\r\n");
    this.httpRequest.setBody(body);
    return this.httpRequest;
  }
}
