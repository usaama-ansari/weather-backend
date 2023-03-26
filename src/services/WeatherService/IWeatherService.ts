import { ApplicationError } from "@Common/errors";
import { Result } from "@Common/logic";
import { GenericObject } from "@Common/types";

export interface IWeatherService {
  getCurrentWeather(
    cityName: string
  ): Promise<Result<GenericObject | ApplicationError>>;
  getFiveDaysWeatherForecast(
    cityName: string
  ): Promise<Result<GenericObject | ApplicationError>>;
}
