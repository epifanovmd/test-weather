import { callApi } from "../../store/common/apiActionsAsync";
import { IWeatherParams, WeatherActions } from "./weatherActions";
import { RequestType } from "../../common/requestType";
import { SimpleThunk } from "../../common/simpleThunk";

export const WeatherAsyncActions = {
  getWeather: (params: IWeatherParams): SimpleThunk => {
    return callApi({
      url: "weather",
      method: RequestType.GET,
      params: {
        ...params,
        appid: "4befe6d2587fbbcdf8bedcf99515b0d7",
      },
      actions: WeatherActions.getWeather,
    });
  },
};
