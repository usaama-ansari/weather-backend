import NodeCache from "node-cache";
import { Result } from "@Common/logic";
import { ICacheClient } from "./ICacheClient";
import { WEATHER_CACHE_DURATION } from "@Common/config";
import { injectable } from "inversify";

@injectable()
export class CacheClient implements ICacheClient {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: WEATHER_CACHE_DURATION });
  }

  async getItem(key: string) {
    try {
      const value = this.cache.get(key);
      if (value) {
        return Result.ok(value);
      }
      return Result.fail<void>();
    } catch (err) {
      return Result.fail<void>();
    }
  }

  async addItem(key: string, item: any, ttl?: number) {
    try {
      typeof ttl === "number"
        ? this.cache.set(key, item, ttl)
        : this.cache.set(key, item);

      return Result.ok<void>();
    } catch (err) {
      return Result.fail<void>();
    }
  }
}

export * from "./ICacheClient";
