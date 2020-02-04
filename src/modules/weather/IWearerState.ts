import { IReduxData } from "../../store/IAppState";
import { LoadState } from "../../common/loadState";
import { IWeather } from "../../api/dto/Wheater.g";

export interface IWearerState {
  weather: IReduxData<IWeather[]>;
}

export const initialWeatherState: IWearerState = {
  weather: { data: [], loadState: LoadState.needLoad },
};
