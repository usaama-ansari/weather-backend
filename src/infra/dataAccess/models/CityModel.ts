import { Model, model, Schema } from "mongoose";
import { DbDocument } from "../types";
import { CityProps } from "@Common/types";

export type ICityModel = Model<CityProps>;
export type CityDoc = DbDocument<CityProps>;

const CitySchema = new Schema<CityProps, ICityModel>({
  name: String,
  created: { type: Date, default: Date.now },
});

export const CityModel = model("City", CitySchema);
