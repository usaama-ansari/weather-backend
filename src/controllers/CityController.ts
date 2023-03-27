import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { BaseController } from "./BaseController";
import { ICityService } from "@Services/CityService";
import { ApplicationError } from "@Common/errorUtils";
import { CityProps, GenericObject } from "@Common/types";

@injectable()
export class CityController extends BaseController {
  private cityService: ICityService;

  constructor(
    @inject(IOC_TYPES.CityService)
    cityService: ICityService
  ) {
    super();
    this.cityService = cityService;
  }

  async addCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { city } = req.body;
      const result = await this.cityService.addCity(city);
      if (result.isSuccess) {
        this.ok(res);
      } else next(result.getValue() as ApplicationError);
    } catch (err) {
      next(err);
    }
  }

  async fetchCities(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.cityService.getCities();
      if (result.isSuccess) {
        let cities = result.getValue() as CityProps[];
        cities = cities.map((city: GenericObject) => city.name);
        this.ok(res, cities);
      } else next(result.getValue() as ApplicationError);
    } catch (err) {
      next(err);
    }
  }
}
