import { combineReducers, Reducer } from "redux";
import { IAppState } from "../IAppState";
import { weatherReducer } from "../../modules/weather/weatherReducer";

export type Reducers<T> = {
  [P in keyof T]: Reducer<T[P]>;
};

export function createMainReduce(): Reducer<IAppState> {
  const _reducers: Reducers<IAppState> = {
    weather: weatherReducer,
  };

  return combineReducers(_reducers);
}
