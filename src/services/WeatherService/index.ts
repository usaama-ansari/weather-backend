import "reflect-metadata";
import { IOC_TYPES } from "@Common/constants";
import { IWeatherClient } from "@Lib/WeatherClient";
import { inject, injectable } from "inversify";
import { IWeatherService } from "./IWeatherService";

@injectable()
export class WeatherService implements IWeatherService {
  private weatherClient: IWeatherClient;

  constructor(@inject(IOC_TYPES.WeatherClient) weatherClient: IWeatherClient) {
    this.weatherClient = weatherClient;
  }
  async getCurrentWeather(cityName: string) {
    const result = this.weatherClient.getCurrentWeather(cityName);
    return result;
  }

  async getFiveDaysWeatherForecast(cityName: string) {
    const result = this.weatherClient.getFiveDaysWeatherForecast(cityName);
    return result;
  }
}

export * from "./IWeatherService";
