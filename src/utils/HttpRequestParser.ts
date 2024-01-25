export class HttpRequestParser {
  private method: string = "";
  private path: string = "";
  private version: string = "";
  private headers: Record<string, string> = {};
  private body: string = "";

  parse(request: string): void {
    const lines = request.split("\r\n");

    // Parse the request line
    const [method, path, version] = lines[0].split(" ");
    this.method = method;
    this.path = path;
    this.version = version;

    // Parse headers
    let i = 1;
    while (lines[i] !== "") {
      const [headerName, headerValue] = lines[i].split(": ");
      this.headers[headerName.toLowerCase()] = headerValue;
      i++;
    }

    // Parse the body
    this.body = lines.slice(i + 1).join("\r\n");
  }

  getMethod(): string {
    return this.method;
  }

  getPath(): string {
    return this.path;
  }

  getVersion(): string {
    return this.version;
  }

  getHeaders(): Record<string, string> {
    return this.headers;
  }

  getBody(): string {
    return this.body;
  }
}
