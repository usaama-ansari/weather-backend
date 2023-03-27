import { CityWeatherDTO } from "./dto";

export * from "./dto";
export type ValueOf<T> = T[keyof T];
export type GenericObject = Record<string, any>;
export type GenericArrayObject = Array<Record<string, any>>;
export type CityProps = {
    name: string;
    created?: Date 
}
