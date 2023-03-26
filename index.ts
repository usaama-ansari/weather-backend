import { Result } from "@Common/logic";
import { CacheClient, ICacheClient } from "@Lib/CacheClient";
import { IWeatherClient, WeatherClient } from "@Lib/WeatherClient";
import { iocContainer } from "@Infra/ioc";
import { IOC_TYPES } from "@Common/constants"; 

const weatherClient = iocContainer.get<IWeatherClient>(IOC_TYPES.WeatherClient);



