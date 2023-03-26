export const IOC_TYPES = {
  /** ==================  Clients  ===================== */
  WeatherClient: Symbol.for("WeatherClient"),
  CacheClient: Symbol.for("CacheClient"),
  /** ==================  Services ===================== */
  WeatherService: Symbol.for("WeatherService"),
  CityService: Symbol.for("CityService"),

  /** ==================  Repositories ===================== */
  CityRepository: Symbol.for("CityRepository"),
};
