export class HttpRequest {
  body: string = "";
  headers: Record<string, string> = {};
  method: string = "";
  path: string = "";
  version: string = "";
  setBody(body: string) {
    this.body = body;
  }
  setHeaders(headers: Record<string, string>) {
    this.headers = headers;
  }
  setMethod(method: string) {
    this.method = method;
  }
  setPath(path: string) {
    this.path = path;
  }
  setVerison(version: string) {
    this.version = version;
  }
}
