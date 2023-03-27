import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { WeatherController } from "@Controllers/WeatherController";
import { BaseRouter } from "../BaseRouter";
import {
  WEATHER_BASE_ROUTE,
  CITY_CURRENT_WEATHER,
  CITY_5_DAYS_FORECAST,
} from "./endpoints";

@injectable()
export class WeatherRouter extends BaseRouter {
  private controller: WeatherController;

  constructor(
    @inject(IOC_TYPES.WeatherController) weatherController: WeatherController
  ) {
    super(WEATHER_BASE_ROUTE);
    this.controller = weatherController;
  }

  registerRoutes(router: Router): void {
    router.get(
      CITY_CURRENT_WEATHER,
      (req: Request, res: Response, next: NextFunction) => {
        this.controller.fetchCurrentWeather(req, res, next);
      }
    );

    router.get(
      CITY_5_DAYS_FORECAST,
      (req: Request, res: Response, next: NextFunction) => {
        this.controller.fetchFiveDaysForecast(req, res, next);
      }
    );
  }
}
