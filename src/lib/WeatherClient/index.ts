import "reflect-metadata";
import fetch from "node-fetch";
import { ICacheClient } from "@Lib/CacheClient/ICacheClient";
import { IWeatherClient } from "./IWeatherClient";
import { WEATHER_API_KEY, WEATHER_API_ENDPOINT } from "@Common/config";
import { Result } from "@Common/logic";
import { GenericObject } from "@Common/types";
import { ApplicationError } from "@Common/errorUtils";
import { inject, injectable } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { HttpStatusCodes } from "@Common/HttpStatusCodes";

const CURRENT_WEATHER_ENDPOINT = `${WEATHER_API_ENDPOINT}/data/2.5/weather?`;
const FIVE_DAYS_FORECAST_ENDPOINT = `${WEATHER_API_ENDPOINT}/data/2.5/forecast?`;

@injectable()
export class WeatherClient implements IWeatherClient {
  private cacheClient: ICacheClient;

  constructor(@inject(IOC_TYPES.CacheClient) cacheClient: ICacheClient) {
    this.cacheClient = cacheClient;
  }

  async getCurrentWeather(cityName: string) {
    const endpoint = `${CURRENT_WEATHER_ENDPOINT}q=${cityName}&appid=${WEATHER_API_KEY}`;
    try {
      /** First check if current weather data is in cache and resturn from cache */
      const cachedDataResult = await this.cacheClient.getItem(
        `${cityName}:current`
      );

      if (cachedDataResult.isSuccess) {
        return Result.ok<GenericObject>(
          cachedDataResult.getValue() as GenericObject
        );
      }

      /** If not found in cache the make api call to openweather and add to cache and return data */
      const response = await fetch(endpoint);
      const currentWeather = await response.json();
      await this.cacheClient.addItem(`${cityName}:current`, currentWeather);
      return Result.ok<GenericObject>(currentWeather);
    } catch (err) {
      return Result.fail(new ApplicationError(err.message, HttpStatusCodes.BAD_REQUEST));
    }
  }

  async getFiveDaysWeatherForecast(cityName: string) {
    const endpoint = `${FIVE_DAYS_FORECAST_ENDPOINT}q=${cityName}&appid=${WEATHER_API_KEY}`;
    try {
      /** First check if 5 days weather forecast data is in cache and resturn from cache */
      const cachedDataResult = await this.cacheClient.getItem(
        `${cityName}:forecast`
      );

      if (cachedDataResult.isSuccess) {
        return Result.ok<GenericObject>(
          cachedDataResult.getValue() as GenericObject
        );
      }

      /** If not found in cache the make api call to openweather and add to cache and return data */
      const response = await fetch(endpoint);
      const forecastData = await response.json();
      await this.cacheClient.addItem(`${cityName}:current`, forecastData);
      return Result.ok<GenericObject>(forecastData);
    } catch (err) {
      return Result.fail(new ApplicationError(err.message, HttpStatusCodes.BAD_REQUEST));
    }
  }
}

export * from "./IWeatherClient";
