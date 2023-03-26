export class ApplicationError {
  private _message: string;
  private _errorCode: number;

  constructor(message: string, errorCode: number) {
    this._message = message;
    this._errorCode = errorCode;
    Object.freeze(this);
  }

  get message() {
    return this._message;
  }

  get errorCode() {
    return this._errorCode;
  }
}
