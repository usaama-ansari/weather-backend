import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { BaseController } from "./BaseController";
import { ApplicationError } from "@Common/errorUtils";
import { IWeatherService } from "@Services/WeatherService";

@injectable()
export class WeatherController extends BaseController {
  private weatherService: IWeatherService;

  constructor(
    @inject(IOC_TYPES.WeatherService)
    weatherService: IWeatherService
  ) {
    super();
    this.weatherService = weatherService;
  }

  async fetchCurrentWeather(req: Request, res: Response, next: NextFunction) {
    try {
      const city = req.query.name as string;
      const result = await this.weatherService.getCurrentWeather(city);
      const data = result.getValue();
      if (result.isSuccess) {
        this.ok(res, data);
      } else next(data as ApplicationError);
    } catch (err) {
      next(err);
    }
  }

  async fetchFiveDaysForecast(req: Request, res: Response, next: NextFunction) {
    try {
      const city = req.query.name as string;
      const result = await this.weatherService.getFiveDaysWeatherForecast(city);
      const data = result.getValue();
      if (result.isSuccess) {
        this.ok(res, data);
      } else next(data as ApplicationError);
    } catch (err) {
      next(err);
    }
  }
}
