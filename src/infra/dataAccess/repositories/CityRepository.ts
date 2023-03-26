import "reflect-metadata";
import { injectable } from "inversify";
import { ICityRepository } from "./ICityRepository";
import { CityModel } from "@Infra/dataAccess/";


@injectable()
export class CityRepository implements ICityRepository {
  async addCity(cityName: string) {
    const newCity = new CityModel();
    newCity.name = cityName;
    const savedCity = await newCity.save();
    return savedCity;
  }

  async getAllCities() {
    const cities = await CityModel.find().lean()
    return cities;
  }
}
