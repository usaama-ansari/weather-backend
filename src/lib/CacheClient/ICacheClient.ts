import { ApplicationError } from "@Common/errors";
import { Result } from "@Common/logic";
import { GenericObject } from "@Common/types";

export interface ICacheClient {
  getItem(key: string): Promise<Result<GenericObject | ApplicationError>>;
  addItem(key: string, item: any): Promise<Result<void | ApplicationError>>;
}