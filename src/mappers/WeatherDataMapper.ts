import { CityWeatherDTO, GenericObject } from "@Common/types";
import { CityFiveDaysForecastDTO } from "@Common/types";

export class WeatherDataMapper {
  mapCurrentWeather(weatherData: GenericObject): CityWeatherDTO {
    const mappedData: CityWeatherDTO = {
      cityName: weatherData.name,
      coordinates: weatherData.coord,
      country: weatherData.sys.country,
      date: new Date(weatherData.dt),
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      temperature: weatherData.main.temp,
      weather: {
        type: weatherData.weather[0].main,
        desc: weatherData.weather[0].description
      },
      windSpeed: weatherData.wind.speed,
    };
    return mappedData;
  }

  mapForecastWeather(forecastData: GenericObject): CityFiveDaysForecastDTO {
    const mappedForecastData: CityFiveDaysForecastDTO = [];
    const list = forecastData.list;
    const cityData = forecastData.city;

    /**
     * selecting one entry out of all 5 days (40 items)  entries.
     * single day data contains 8 forecasts at 3 hours,
     *
     */
    for (let i = 0; i < list.length; i += 8) {
      const mapped = this.mapSingleForecast(list[i], cityData);
      mappedForecastData.push(mapped);
    }

    function mapSingleForecast(
      item: GenericObject,
      cityData: GenericObject
    ): CityWeatherDTO {
      const mapped: CityWeatherDTO = {
        cityName: cityData.name,
        coordinates: cityData.coord,
        country: cityData.country,
        date: new Date(item.dt_txt),
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        temperature: item.main.temp,
        weather: {
          type: item.weather[0].main,
          desc: item.weather[0].description
        },
        windSpeed: item.wind.speed,
      };

      return mapped;
    }

    return mappedForecastData;
  }

  private mapSingleForecast(
    item: GenericObject,
    cityData: GenericObject
  ): CityWeatherDTO {
    const mapped: CityWeatherDTO = {
      cityName: cityData.name,
      coordinates: cityData.coord,
      country: cityData.country,
      date: new Date(item.dt_txt),
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      temperature: item.main.temp,
      weather: item.weather[0].main,
      windSpeed: item.wind.speed,
    };

    return mapped;
  }
}
