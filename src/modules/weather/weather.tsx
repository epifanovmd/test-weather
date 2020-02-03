import React, { FC, useCallback, useState } from "react";
import { CustomInput } from "../../components/controls/customInput/customInput";
import { CustomButton } from "../../components/controls/сustomButton/customButton";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { WeatherAsyncActions } from "./weatherAsyncActions";

export const Weather: FC = () => {
  const [city, setCity] = useState("Москва");

  const dispatch = useDispatch();

  const onGetWeather = useCallback(() => {
    dispatch(WeatherAsyncActions.getWeather({ q: city }));
  }, [city]);

  return (
    <div className={styles.form}>
      <CustomInput className={styles.cityInput} title={"Город"} />
      <CustomButton onClick={onGetWeather} name={"Загрузить"} />
    </div>
  );
};
