export class ApplicationError {
  private _message: string;
  private _errorCode: string;

  constructor(message: string, errorCode: string) {
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
