import "reflect-metadata";
import fetch from "node-fetch";
import { ICacheClient } from "@Lib/CacheClient/ICacheClient";
import { injectable } from "inversify";
import { IWeatherClient } from "./IWeatherClient";
import { WEATHER_API_KEY, WEATHER_API_ENDPOINT } from "@Common/config";
import { Result } from "@Common/logic";
import { GenericObject } from "@Common/types";
import { ApplicationError } from "@Common/errorUtils";
import { HttpStatusCodes } from "@Common/HttpStatusCodes";

const CURRENT_WEATHER_ENDPOINT = `${WEATHER_API_ENDPOINT}/data/2.5/weather?`;
const FIVE_DAYS_FORECAST_ENDPOINT = `${WEATHER_API_ENDPOINT}/data/2.5/forecast?`;

@injectable()
export class WeatherClient implements IWeatherClient {
  async getCurrentWeather(cityName: string) {
    try {
      const endpoint = `${CURRENT_WEATHER_ENDPOINT}q=${cityName}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(endpoint);
      const currentWeather = await response.json();
      return Result.ok<GenericObject>(currentWeather);
    } catch (err) {
      return Result.fail(
        new ApplicationError(err.message, HttpStatusCodes.BAD_REQUEST)
      );
    }
  }

  async getFiveDaysWeatherForecast(cityName: string) {
    try {
      const endpoint = `${FIVE_DAYS_FORECAST_ENDPOINT}q=${cityName}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(endpoint);
      const forecastData = await response.json();
      return Result.ok<GenericObject>(forecastData);
    } catch (err) {
      return Result.fail(
        new ApplicationError(err.message, HttpStatusCodes.BAD_REQUEST)
      );
    }
  }
}

export * from "./IWeatherClient";
