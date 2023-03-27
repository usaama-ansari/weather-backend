import "reflect-metadata";
import { Container } from "inversify";
import { IOC_TYPES } from "@Common/constants";
import { WeatherClient, IWeatherClient } from "@Lib/WeatherClient";
import { CacheClient, ICacheClient } from "@Lib/CacheClient";
import { WeatherService, IWeatherService } from "@Services/WeatherService";
import { CityRepository, ICityRepository } from "@Infra/dataAccess";
import { CityService, ICityService } from "@Services/CityService";
import { RootRouter } from "@Infra/routers/RootRouter";
import { CityRouter } from "@Infra/routers/CityRouter";
import { WeatherRouter } from "@Infra/routers/WeatherRouter";
import { CityController } from "@Controllers/CityController";
import { WeatherController } from "@Controllers/WeatherController";

const iocContainer = new Container();

iocContainer.bind<ICacheClient>(IOC_TYPES.CacheClient).to(CacheClient).inSingletonScope();
iocContainer.bind<IWeatherClient>(IOC_TYPES.WeatherClient).to(WeatherClient).inSingletonScope();

/** Binding Respositories */
iocContainer.bind<ICityRepository>(IOC_TYPES.CityRepository).to(CityRepository);

/** Binding Services */
iocContainer.bind<IWeatherService>(IOC_TYPES.WeatherService).to(WeatherService);
iocContainer.bind<ICityService>(IOC_TYPES.CityService).to(CityService);

/** Binding Routers */
iocContainer.bind<RootRouter>(IOC_TYPES.RootRouter).to(RootRouter);
iocContainer.bind<CityRouter>(IOC_TYPES.CityRouter).to(CityRouter);
iocContainer.bind<WeatherRouter>(IOC_TYPES.WeatherRouter).to(WeatherRouter);

/** Binding Controllers */
iocContainer.bind<CityController>(IOC_TYPES.CityController).to(CityController);
iocContainer.bind<WeatherController>(IOC_TYPES.WeatherController).to(WeatherController);


export { iocContainer };
