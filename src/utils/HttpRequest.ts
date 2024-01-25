import { HttpRequestProps } from "../types";

export class HttpRequest {
  body: string = "";
  headers: Record<string, string> = {};
  method: string = "";
  path: string = "";
  version: string = "";

  buildRequest({ body, headers, path, version, method }: HttpRequestProps) {
    this.headers = headers;
    this.body = body;
    this.path = path;
    this.method = method;
    this.version = version;
  }
}
