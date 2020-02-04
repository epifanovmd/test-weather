import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { CustomInput } from "../../components/controls/customInput/customInput";
import { CustomButton } from "../../components/controls/сustomButton/customButton";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { WeatherAsyncActions } from "./weatherAsyncActions";
import { Tabs } from "antd";
import { Route, Switch, useHistory, useLocation } from "react-router";
import { AllWeatherList } from "./subModules/allWeatherList/allWeatherList";
import { ActiveWeatherList } from "./subModules/activeWeatherList/activeWeatherList";
import { DeletedWeatherList } from "./subModules/deletedWeatherList/deletedWeatherList";
const { TabPane } = Tabs;

export const Weather: FC = () => {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  const onGetWeather = useCallback(() => {
    dispatch(WeatherAsyncActions.getWeather({ q: city || "Москва" }));
    setCity("");
  }, [city, setCity, dispatch]);

  const location = useLocation();
  const { push } = useHistory();

  const onChangeLocation = useCallback(
    (key: string) => {
      push(key);
    },
    [push],
  );

  const onChangeCity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setCity(value);
    },
    [setCity],
  );

  const onEnterInput = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        dispatch(WeatherAsyncActions.getWeather({ q: city || "Москва" }));
        setCity("");
      }
    },
    [city, dispatch, setCity],
  );

  return (
    <>
      <div className={styles.form}>
        <CustomInput
          className={styles.cityInput}
          title={"Город"}
          placeholder={"Москва"}
          onChange={onChangeCity}
          onKeyDown={onEnterInput}
          value={city}
        />
        <CustomButton onClick={onGetWeather} name={"Загрузить"} />
      </div>
      <Tabs defaultActiveKey={location.pathname} onChange={onChangeLocation}>
        <TabPane tab="Все" key="/all" />
        <TabPane tab="Активные" key="/active" />
        <TabPane tab="Удаленные" key="/deleted" />
      </Tabs>
      <Switch>
        <Route exect={true} path={"/active"} component={ActiveWeatherList} />
        <Route exect={true} path={"/deleted"} component={DeletedWeatherList} />
        <Route exect={true} path={"*"} component={AllWeatherList} />
      </Switch>
    </>
  );
};
