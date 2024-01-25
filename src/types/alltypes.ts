export type ServerProps = {
  get: Record<string, Function>;
  post: Record<string, Function>;
};
export type HttpRequestProps = {
  body: string;
  headers: Record<string, string>;
  method: string;
  path: string;
  version: string;
};
