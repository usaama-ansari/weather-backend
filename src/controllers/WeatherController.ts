import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { BaseController } from "./BaseController";
import { ApplicationError } from "@Common/errorUtils";
import { IWeatherService } from "@Services/WeatherService";
import { WeatherDataMapper } from "mappers";
import { CityFiveDaysForecastDTO, CityWeatherDTO } from "@Common/types";

@injectable()
export class WeatherController extends BaseController {
  private weatherService: IWeatherService;
  private weatherDataMapper: WeatherDataMapper;

  constructor(
    @inject(IOC_TYPES.WeatherService)
    weatherService: IWeatherService
  ) {
    super();
    this.weatherService = weatherService;
    this.weatherDataMapper = new WeatherDataMapper();
  }

  async fetchCurrentWeather(req: Request, res: Response, next: NextFunction) {
    try {
      const city = req.query.city as string;
      const result = await this.weatherService.getCurrentWeather(city);
      const data = result.getValue();
      const mappedCurrentWeather: CityWeatherDTO =
        this.weatherDataMapper.mapCurrentWeather(data);
      if (result.isSuccess) {
        this.ok(res, mappedCurrentWeather);
      } else next(data as ApplicationError);
    } catch (err) {
      next(err);
    }
  }

  async fetchFiveDaysForecast(req: Request, res: Response, next: NextFunction) {
    try {
      const city = req.query.city as string;
      const result = await this.weatherService.getFiveDaysWeatherForecast(city);
      const data = result.getValue();
      const mappedData: CityFiveDaysForecastDTO =
        this.weatherDataMapper.mapForecastWeather(data);
      if (result.isSuccess) {
        this.ok(res, mappedData);
      } else next(data as ApplicationError);
    } catch (err) {
      next(err);
    }
  }
}
