import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ICityService } from "./ICityService";
import { IOC_TYPES } from "@Common/constants";
import { ICityRepository } from "@Infra/dataAccess";
import { Result } from "@Common/logic";
import { ApplicationError } from "@Common/errorUtils";
import { CityProps } from "@Common/types";

@injectable()
export class CityService implements ICityService {
  private cityRepo: ICityRepository;

  constructor(@inject(IOC_TYPES.CityRepository) cityRepo: ICityRepository) {
    this.cityRepo = cityRepo;
  }

  async addCity(cityName: string) {
    try {
      await this.cityRepo.addCity(cityName);
      return Result.ok<void>();
    } catch (err) {
      return Result.fail(new ApplicationError("Failed to add new City", 502));
    }
  }

  async getCities() {
    try {
        const cities = await this.cityRepo.getAllCities();
        return Result.ok<Array<CityProps>>(cities)
    } catch (err) {
      return Result.fail(new ApplicationError("Failed to fetch cities", 502));
    }
  }
}

export * from "./ICityService";
