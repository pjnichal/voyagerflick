export class HttpRequest {
  body: string = "";
  buildRequest(body: string) {
    this.body = body;
  }
}
