import "reflect-metadata";
import { Container } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { WeatherClient, IWeatherClient } from "@Lib/WeatherClient";
import { CacheClient, ICacheClient } from "@Lib/CacheClient";
import { WeatherService, IWeatherService } from "@Services/WeatherService";
import { CityRepository, ICityRepository } from "@Infra/dataAccess";
import { CityService, ICityService } from "@Services/CityService";

const iocContainer = new Container();

iocContainer
  .bind<ICacheClient>(IOC_TYPES.CacheClient)
  .to(CacheClient)
  .inSingletonScope();

iocContainer
  .bind<IWeatherClient>(IOC_TYPES.WeatherClient)
  .to(WeatherClient)
  .inSingletonScope();

iocContainer.bind<ICityRepository>(IOC_TYPES.CityRepository).to(CityRepository);
iocContainer.bind<IWeatherService>(IOC_TYPES.WeatherService).to(WeatherService);
iocContainer.bind<ICityService>(IOC_TYPES.CityService).to(CityService);

export { iocContainer };
