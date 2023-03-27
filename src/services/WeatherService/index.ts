import "reflect-metadata";
import { IOC_TYPES } from "@Common/constants";
import { IWeatherClient } from "@Lib/WeatherClient";
import { inject, injectable } from "inversify";
import { IWeatherService } from "./IWeatherService";
import { ICacheClient } from "@Lib/CacheClient";
import { Result } from "@Common/logic";
import { GenericObject } from "@Common/types";

@injectable()
export class WeatherService implements IWeatherService {
  private weatherClient: IWeatherClient;
  private cacheClient: ICacheClient;

  constructor(
    @inject(IOC_TYPES.WeatherClient) weatherClient: IWeatherClient,
    @inject(IOC_TYPES.CacheClient) cacheClient: ICacheClient
  ) {
    this.weatherClient = weatherClient;
    this.cacheClient = cacheClient;
  }
  async getCurrentWeather(cityName: string) {
    /** First check if current weather data is in cache and resturn from cache */
    const cachedDataResult = await this.cacheClient.getItem(
      `${cityName}:current`
    );

    if (cachedDataResult.isSuccess) {
      const data = cachedDataResult.getValue();
      return Result.ok(data as GenericObject);
    }

    /** If not found in cache the make api call to openweather and add to cache and return data */
    const result = await this.weatherClient.getCurrentWeather(cityName);
    if (result.isSuccess) {
      await this.cacheClient.addItem(`${cityName}:current`, result.getValue());
    }

    return result;
  }

  async getFiveDaysWeatherForecast(cityName: string) {
    /** First check if 5 days weather forecast data is in cache and resturn from cache */
    const cachedDataResult = await this.cacheClient.getItem(
      `${cityName}:forecast`
    );

    if (cachedDataResult.isSuccess) {
      const data = cachedDataResult.getValue();
      return Result.ok<GenericObject>(data as GenericObject);
    }

    /** If not found in cache the make api call to openweather and add to cache and return data */
    const result = await this.weatherClient.getFiveDaysWeatherForecast(
      cityName
    );
    if (result.isSuccess) {
      await this.cacheClient.addItem(`${cityName}:forecast`, result.getValue());
    }
    return result;
  }
}

export * from "./IWeatherService";
