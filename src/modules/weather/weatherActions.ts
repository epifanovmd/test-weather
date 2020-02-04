import { actionCreator } from "../../store/common/actionCreator";
import { IResponse } from "../../api";
import { IWeatherDto } from "../../api/dto/Wheater.g";

export interface IWeatherParams {
  q: string;
  appid?: string;
}

export interface IWeatherChangeParams {
  id: number;
  name?: string;
  temp?: string;
}

export const WeatherActions = {
  getWeather: actionCreator.async<
    IWeatherParams,
    IResponse<IWeatherDto>,
    Error
  >("Weather/GET_WEATHER"),
  deleteWeatherItem: actionCreator<IWeatherChangeParams>(
    "Weather/DELETE_WEATHER",
  ),
  restoreWeatherItem: actionCreator<IWeatherChangeParams>(
    "Weather/RESTORE_WEATHER",
  ),
  changeWeatherItem: actionCreator<IWeatherChangeParams>(
    "Weather/CHANGE_WEATHER",
  ),

  upWeatherItem: actionCreator<IWeatherChangeParams>("Weather/UP_WEATHER"),
  downWeatherItem: actionCreator<IWeatherChangeParams>("Weather/DOWN_WEATHER"),
};
