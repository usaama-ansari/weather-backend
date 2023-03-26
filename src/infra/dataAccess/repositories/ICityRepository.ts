import { DbCreateQueryResult } from "../types";
import { CityProps } from "@Common/types";

export interface ICityRepository {
  addCity(cityName: string): Promise<DbCreateQueryResult<CityProps>>;

  getAllCities(): Promise<Array<CityProps>>;
}
