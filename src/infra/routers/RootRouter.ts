import { Router } from "express";
import { inject, injectable } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { CityRouter } from "./CityRouter";
import { WeatherRouter } from "./WeatherRouter";

@injectable()
export class RootRouter {
  @inject(IOC_TYPES.CityRouter) private cityRouter: CityRouter;
  @inject(IOC_TYPES.WeatherRouter) private weatherRouter: WeatherRouter;

  private readonly _routerInstance: Router;

  constructor() {
    this._routerInstance = Router();
  }

  get routerInstance() {
    return this._routerInstance;
  }

  public loadAllRouters(): void {
    /** loading the city router with the base api path for api */
    this._routerInstance.use(
      this.cityRouter.BASE_PATH,
      this.cityRouter.routerInstance
    );

    /** loading the weather router with the base api path for api */
    this._routerInstance.use(
      this.weatherRouter.BASE_PATH,
      this.weatherRouter.routerInstance
    );
  }
}
