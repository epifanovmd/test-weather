import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialWeatherState } from "./IWearerState";
import { IWeatherParams, WeatherActions } from "./weatherActions";
import { newState } from "../../store/common/newState";
import { Success } from "typescript-fsa";
import { IResponse } from "../../api";
import { IWeather } from "../../api/dto/Wheater.g";

const getWeatherStartHandler = (state: IWeather) => {
  return newState(state, {});
};
const getWeatherDoneHandler = (
  state: IWeather,
  { result }: Success<IWeatherParams, IResponse<IWeather>>,
) => {
  return newState(state, { result });
};

const getWeatherFailureHandler = (state: IWeather) => {
  return newState(state, {});
};

export const weatherReducer = reducerWithInitialState(initialWeatherState)
  .case(WeatherActions.getWeather.started, getWeatherStartHandler)
  .case(WeatherActions.getWeather.done, getWeatherDoneHandler)
  .case(WeatherActions.getWeather.failed, getWeatherFailureHandler)
  .build();
