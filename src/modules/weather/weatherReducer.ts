import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialWeatherState, IWearerState } from "./IWearerState";
import {
  IWeatherChangeParams,
  IWeatherParams,
  WeatherActions,
} from "./weatherActions";
import { newState } from "../../store/common/newState";
import { Success } from "typescript-fsa";
import { IResponse } from "../../api";
import { IWeatherDto, TWeatherStatus } from "../../api/dto/Wheater.g";
import { LoadState } from "../../common/loadState";

const getWeatherStartHandler = (state: IWearerState) => {
  return newState(state, {
    weather: {
      ...state.weather,
      loadState: LoadState.refreshing,
    },
  });
};
const getWeatherDoneHandler = (
  state: IWearerState,
  { result }: Success<IWeatherParams, IResponse<IWeatherDto>>,
) => {
  if (state.weather.data.find((item) => item.id === result.data.id)) {
    return state;
  }

  return newState(state, {
    weather: {
      loadState: LoadState.idle,
      data: [
        ...state.weather.data,
        {
          id: result.data.id,
          temp: (+result.data.main.temp - 273.15).toFixed(1),
          name: result.data.name,
          status: "ACTIVE",
        },
      ],
    },
  });
};

const getWeatherFailureHandler = (state: IWearerState) => {
  return newState(state, {
    weather: {
      data: state.weather.data,
      loadState: LoadState.error,
    },
  });
};

const deleteWeatherItemHandler = (
  state: IWearerState,
  { id }: IWeatherChangeParams,
) => {
  return newState(state, {
    weather: {
      ...state.weather,
      data: state.weather.data.map((item) =>
        item.id === id
          ? { ...item, status: "DELETED" as TWeatherStatus }
          : item,
      ),
    },
  });
};

const restoreWeatherItemHandler = (
  state: IWearerState,
  { id }: IWeatherChangeParams,
) => {
  return newState(state, {
    weather: {
      ...state.weather,
      data: state.weather.data.map((item) =>
        item.id === id ? { ...item, status: "ACTIVE" as TWeatherStatus } : item,
      ),
    },
  });
};

const changeWeatherItemHandler = (
  state: IWearerState,
  { id, temp = "", name = "" }: IWeatherChangeParams,
) => {
  return newState(state, {
    weather: {
      ...state.weather,
      data: state.weather.data.map((item) =>
        item.id === id
          ? { ...item, temp, name, status: "ACTIVE" as TWeatherStatus }
          : item,
      ),
    },
  });
};

const upWeatherItemHandler = (
  state: IWearerState,
  { id }: IWeatherChangeParams,
) => {
  const index =
    state.weather.data.indexOf(
      state.weather.data.find((item) => item.id === id)!,
    ) || -1;
  const newData = state.weather.data;
  if (index > 0) {
    [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
  }

  return newState(state, {
    weather: {
      ...state.weather,
      data: [...newData],
    },
  });
};

const downWeatherItemHandler = (
  state: IWearerState,
  { id }: IWeatherChangeParams,
) => {
  const index =
    state.weather.data.indexOf(
      state.weather.data.find((item) => item.id === id)!,
    ) || -1;
  const newData = state.weather.data;
  if (index < state.weather.data.length - 1) {
    [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
  }

  return newState(state, {
    weather: {
      ...state.weather,
      data: [...newData],
    },
  });
};

export const weatherReducer = reducerWithInitialState(initialWeatherState)
  .case(WeatherActions.getWeather.started, getWeatherStartHandler)
  .case(WeatherActions.getWeather.done, getWeatherDoneHandler)
  .case(WeatherActions.getWeather.failed, getWeatherFailureHandler)

  .case(WeatherActions.deleteWeatherItem, deleteWeatherItemHandler)
  .case(WeatherActions.restoreWeatherItem, restoreWeatherItemHandler)

  .case(WeatherActions.changeWeatherItem, changeWeatherItemHandler)

  .case(WeatherActions.upWeatherItem, upWeatherItemHandler)
  .case(WeatherActions.downWeatherItem, downWeatherItemHandler)
  .build();
