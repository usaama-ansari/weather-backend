import { ApplicationError } from "@Common/errorUtils";
import { Result } from "@Common/logic";
import { GenericObject } from "@Common/types";

export interface IWeatherClient {
  getCurrentWeather(
    cityName: string
  ): Promise<Result<GenericObject | ApplicationError>>;
  getFiveDaysWeatherForecast(
    cityName: string
  ): Promise<Result<GenericObject | ApplicationError>>;
}
