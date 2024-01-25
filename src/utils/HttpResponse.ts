export class HttpResponse {
  body: string = "";
  status: number = 500;

  send({ body, status }: { body: string; status: number }) {
    this.body = body;
    this.status = status;
    return;
  }
}
