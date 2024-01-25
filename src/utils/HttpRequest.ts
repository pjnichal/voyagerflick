export class HttpRequest {
  body: string = "";
  headers: Record<string, string> = {};
  buildRequest(body: string, headers: Record<string, string>) {
    this.headers = headers;
    this.body = body;
  }
}
