import "reflect-metadata";
import { Container } from "inversify";
import { WeatherClient, IWeatherClient } from "@Lib/WeatherClient";
import { CacheClient, ICacheClient } from "@Lib/CacheClient";
import { IOC_TYPES } from "@Common/constants";

const iocContainer = new Container();

iocContainer
  .bind<ICacheClient>(IOC_TYPES.CacheClient)
  .to(CacheClient)
  .inSingletonScope();

iocContainer
  .bind<IWeatherClient>(IOC_TYPES.WeatherClient)
  .to(WeatherClient)
  .inSingletonScope();


export { iocContainer };
