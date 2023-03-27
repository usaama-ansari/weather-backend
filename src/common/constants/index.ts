export const IOC_TYPES = {
  /** ==================  Clients  ===================== */
  WeatherClient: Symbol.for("WeatherClient"),
  CacheClient: Symbol.for("CacheClient"),
  /** ==================  Services ===================== */
  WeatherService: Symbol.for("WeatherService"),
  CityService: Symbol.for("CityService"),

  /** ==================  Repositories ===================== */
  CityRepository: Symbol.for("CityRepository"),

  /** ==================  Controllers ===================== */
  CityController: Symbol.for("CityController"),
  WeatherController: Symbol.for("WeatherController"),

  /** ==================  Routers ===================== */
  RootRouter: Symbol.for("RootRouter"),
  CityRouter: Symbol.for("CityRouter"),
  WeatherRouter: Symbol.for("WeatherRouter"),
};
