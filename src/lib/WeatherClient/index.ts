import request, { Response } from "request";
import { ICacheClient } from "@Lib/CacheClient/ICacheClient";
import { IWeatherClient } from "./IWeatherClient";
import { WEATHER_API_KEY, WEATHER_API_ENDPOINT } from "@Common/config";
import { Result } from "@Common/logic";
import { GenericObject } from "@Common/types";
import { ApplicationError } from "@Common/errors";

const CURRENT_WEATHER_ENDPOINT = `${WEATHER_API_ENDPOINT}/data/2.5/weather?`;
const FIVE_DAYS_FORECAST_ENDPOINT = `${WEATHER_API_ENDPOINT}/data/2.5/forecast?`;

export class WeatherClient implements IWeatherClient {
  private cacheClient: ICacheClient;

  constructor(cacheClient: ICacheClient) {
    this.cacheClient = cacheClient;
  }

  async getCurrentWeather(cityName: string) {
    return new Promise<Result<GenericObject | ApplicationError>>((resolve) => {
      const endpoint = `${CURRENT_WEATHER_ENDPOINT}q=${cityName}&appid=${WEATHER_API_KEY}`;
      try {
        request
          .get(endpoint)
          .on("response", (response: Response) => {
            resolve(Result.ok(response.body));
          })
          .on("error", (error) => {
            resolve(Result.fail(new ApplicationError(error.message, 502)));
          });
      } catch (err) {
        resolve(Result.fail(new ApplicationError(err.message, 502)));
      }
    });
  }

  async getFiveDaysWeatherForecast(cityName: string) {
    return new Promise<Result<GenericObject | ApplicationError>>((resolve) => {
      const endpoint = `${FIVE_DAYS_FORECAST_ENDPOINT}q=${cityName}&appid=${WEATHER_API_KEY}`;
      try {
        request
          .get(endpoint)
          .on("response", (response: Response) => {
            resolve(Result.ok(response.body));
          })
          .on("error", (error) => {
            resolve(Result.fail(new ApplicationError(error.message, 502)));
          });
      } catch (err) {
        resolve(Result.fail(new ApplicationError(err.message, 502)));
      }
    });
  }
}
