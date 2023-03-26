const { NODE_ENV } = process.env;
export const { WEATHER_API_KEY, WEATHER_API_ENDPOINT, DB_HOST } = process.env;
export const IS_DEV = !NODE_ENV || NODE_ENV === "development" ? true : false;
export const IS_PROD = NODE_ENV && NODE_ENV === "production" ? true : false;
export const WEATHER_CACHE_DURATION = 300; // in seconds
export const CORS_CONFIG = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
}

export const SERVER_PORT = 8080;
export const DB_OPTIONS = {};
