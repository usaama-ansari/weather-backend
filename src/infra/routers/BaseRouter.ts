import { Router } from "express";
import { injectable, unmanaged } from "inversify";

@injectable()
export abstract class BaseRouter {
  private readonly _routerInstance: Router;
  private _basePath: string;

  constructor(@unmanaged() basePath: string) {
    this._basePath = basePath;
    this._routerInstance = Router();

    this.registerRoutes(this._routerInstance);
  }

  protected abstract registerRoutes(router: Router): void;

  get routerInstance(): Router {
    return this._routerInstance;
  }

  get BASE_PATH(): string {
    return this._basePath;
  }
}
