export class HttpResponse {
  body: string = "";
  status: number = 500;
  type: string = "text/plain";
  send({ body, status }: { body: string; status: number }) {
    this.body = body;
    this.status = status;
    return;
  }
  json({ body, status }: { body: string; status: number }) {
    this.body = JSON.stringify(body);
    this.status = status;
    this.type = "application/json";
    return;
  }
}
