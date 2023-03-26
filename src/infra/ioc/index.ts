import "reflect-metadata";
import { Container } from "inversify";
import { WeatherClient, IWeatherClient } from "@Lib/WeatherClient";
import { CacheClient, ICacheClient } from "@Lib/CacheClient";
import { TYPES_IOC } from "./constants";

const iocContainer = new Container();

iocContainer
  .bind<ICacheClient>(TYPES_IOC.CacheClient)
  .to(CacheClient)
  .inSingletonScope();

iocContainer
  .bind<IWeatherClient>(TYPES_IOC.WeatherClient)
  .to(WeatherClient)
  .inSingletonScope();


export { iocContainer };
