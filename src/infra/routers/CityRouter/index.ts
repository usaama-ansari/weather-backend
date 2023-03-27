import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { CityController } from "@Controllers/CityController";
import { IOC_TYPES } from "@Common/constants";
import { BaseRouter } from "../BaseRouter";
import { CITY_BASE_ROUTE, CITY, CITIES } from "./endpoints";

@injectable()
export class CityRouter extends BaseRouter {
  private controller: CityController;

  constructor(
    @inject(IOC_TYPES.CityController) cityController: CityController
  ) {
    super(CITY_BASE_ROUTE);
    this.controller = cityController;
  }

  registerRoutes(router: Router): void {
    router.post(CITY, (req: Request, res: Response, next: NextFunction) => {
      this.controller.addCity(req, res, next);
    });

    router.get(CITIES, (req: Request, res: Response, next: NextFunction) => {
      this.controller.fetchCities(req, res, next);
    });
  }
}
