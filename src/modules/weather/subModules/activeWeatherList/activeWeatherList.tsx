import React, { FC } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { IAppState } from "../../../../store/IAppState";
import { WeatherList } from "../../../../components/weatherList/weatherList";

export const ActiveWeatherList: FC = () => {
  const weather = useSelector((state: IAppState) => state.weather.weather.data);

  return <WeatherList list={weather.filter((item) => item.status === "ACTIVE")} />;
};
