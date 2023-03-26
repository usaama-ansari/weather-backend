import { ApplicationError } from "./ApplicationError";

export class ErrorHandler {
  private logger: any;
  private reporter: any;

  constructor(logger: any, reporter: any) {
    this.logger = logger;
    this.reporter = reporter;
  }

  public async handleError(err: unknown): Promise<void> {
    console.log(err);
    return Promise.resolve();
    // this.logger.log(err)
    // this.reporter.report(err)
  }

  isTrustedError(err: unknown) {
    return err instanceof ApplicationError
  }
}
