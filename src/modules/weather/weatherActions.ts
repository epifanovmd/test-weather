import { actionCreator } from "../../store/common/actionCreator";
import { IResponse } from "../../api";
import { IWeather } from "../../api/dto/Wheater.g";

export interface IWeatherParams {
  q: string;
  appid?: string;
}

export const WeatherActions = {
  getWeather: actionCreator.async<IWeatherParams, IResponse<IWeather>, Error>(
    "Weather/GET_WEATHER",
  ),
};
