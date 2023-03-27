const { NODE_ENV } = process.env;
export const { WEATHER_API_KEY } = process.env;
export const IS_DEV = !NODE_ENV || NODE_ENV === "development" ? true : false;
export const IS_PROD = NODE_ENV && NODE_ENV === "production" ? true : false;
export const WEATHER_CACHE_DURATION = 300; // in seconds
export const CORS_CONFIG = {
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
};

export const BASE_ENDPOINT_V1 = "/api/v1/";
export const SERVER_PORT = 8080;
export const DB_OPTIONS = {};
export const DB_HOST = "mongodb://localhost:27017/weather-forecast";
export const WEATHER_API_ENDPOINT= "https://api.openweathermap.org"
console.log(NODE_ENV);
