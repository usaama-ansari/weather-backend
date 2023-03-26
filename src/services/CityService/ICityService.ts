import { ApplicationError } from "@Common/errors";
import { Result } from "@Common/logic";
import { CityProps } from "@Common/types";

export interface ICityService {
  addCity(cityName: string): Promise<Result<void | ApplicationError>>;
  getCities(): Promise<Result<Array<CityProps> | ApplicationError>>;
}
