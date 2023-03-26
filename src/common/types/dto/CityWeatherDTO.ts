/**
 * This is the data that we are intrested in from the openweather api.
 * It has been mapped specifically to this app.
 */

export type CityWeatherDTO = {
  cityName: string;
  country: string;
  date: Date;
  coordinates: {
    lat: number;
    lon: number;
  };
  temperature: string;
  humidity: string;
  pressure: string;
  weather: {
    type: string;
    desc: string;
  };
  windSpeed: string;
};
