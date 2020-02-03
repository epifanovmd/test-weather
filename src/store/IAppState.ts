import { LoadState } from "../common/loadState";
import { IWearerState } from "../modules/weather/IWearerState";

export interface IReduxData<T> {
  loadState?: LoadState;
  count?: number;
  page?: number;
  limit?: number;
  data: T;
}

export interface IAppState {
  weather: IWearerState;
}
