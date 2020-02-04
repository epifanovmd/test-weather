import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../../../../store/IAppState";
import { WeatherList } from "../../../../components/weatherList/weatherList";

export const AllWeatherList: FC = memo(() => {
  const weather = useSelector((state: IAppState) => state.weather.weather.data);

  return <WeatherList list={weather} />;
});
