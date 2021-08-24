export class Result {
  public code?: number;

  public data?: any;

  public status?: boolean;

  public msg?: string

  constructor(code = 200, data?: any, status = true, msg?: string) {
    this.code = code;
    this.data = data;
    this.status = status;
    this.msg = msg;
  }
}
