import React, { ChangeEvent, FC, useCallback, useState } from "react";
import styles from "./styles.module.scss";
import { TableHeader } from "../table/tableHeader";
import { TableRowCell } from "../table/tableRowCell";
import { TableRow } from "../table/tableRow";
import { Table } from "../table/table";
import { IWeather } from "../../api/dto/Wheater.g";
import { CustomButton } from "../controls/сustomButton/customButton";
import { useDispatch } from "react-redux";
import { WeatherActions } from "../../modules/weather/weatherActions";
import { Icon, Modal } from "antd";
import { CustomInput } from "../controls/customInput/customInput";
interface IProps {
  list: IWeather[];
}

interface IWeatherModalData {
  visible: boolean;
  id: number;
}

export const WeatherList: FC<IProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [modalWeatherData, setModalWeatherData] = useState({
    visible: false,
    id: -1,
  });
  const [changeData, setChangeData] = useState({
    name: "",
    temp: "",
  });

  const onChangeStatusItem = useCallback(
    (
      id: number,
      action:
        | "deleteWeatherItem"
        | "restoreWeatherItem"
        | "upWeatherItem"
        | "downWeatherItem",
    ) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(WeatherActions[action]({ id }));
    },
    [dispatch],
  );

  const modalManipulation = useCallback(
    ({ visible, id }: IWeatherModalData) => () => {
      setChangeData({
        temp: list.find((item) => item.id === id)?.temp || "",
        name: list.find((item) => item.id === id)?.name || "",
      });
      setModalWeatherData({
        visible,
        id,
      });
    },
    [setChangeData, setModalWeatherData, list],
  );

  const onChangeItem = useCallback(
    (id: number, name: string, temp: string) => () => {
      dispatch(WeatherActions.changeWeatherItem({ id, name, temp }));
      setModalWeatherData({ ...modalWeatherData, visible: false });
    },
    [dispatch],
  );

  const onChangeData = useCallback(
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeData({ ...changeData, [key]: value });
    },
    [changeData, setChangeData],
  );

  return (
    <>
      <Modal
        title={list.find((item) => item.id === modalWeatherData.id)?.name || ""}
        visible={modalWeatherData.visible}
        okText={"Сохранить"}
        cancelText={"Отменить"}
        onOk={onChangeItem(
          modalWeatherData.id,
          changeData.name,
          changeData.temp,
        )}
        onCancel={modalManipulation({ ...modalWeatherData, visible: false })}
      >
        <CustomInput
          title={"Название города"}
          value={changeData.name}
          onChange={onChangeData("name")}
        />
        <CustomInput
          title={"Температору по цельсию"}
          value={changeData.temp}
          onChange={onChangeData("temp")}
        />
      </Modal>
      <Table>
        <TableHeader>
          <TableRowCell>Название города</TableRowCell>
          <TableRowCell>Температору по цельсию</TableRowCell>
          <TableRowCell>Статус</TableRowCell>
          <TableRowCell>Вверх/Вниз</TableRowCell>
          <TableRowCell>Удалить/Востановаить</TableRowCell>
        </TableHeader>

        {list.map((item, index) => (
          <TableRow
            onClick={modalManipulation({ visible: true, ...item })}
            key={item.name + index}
          >
            <TableRowCell>{item.name}</TableRowCell>
            <TableRowCell>{item.temp}</TableRowCell>
            <TableRowCell>{item.status}</TableRowCell>
            <TableRowCell>
              <Icon
                type="up"
                onClick={onChangeStatusItem(item.id, "upWeatherItem")}
              />
              <Icon
                type="down"
                onClick={onChangeStatusItem(item.id, "downWeatherItem")}
              />
            </TableRowCell>
            <TableRowCell>
              {item.status === "ACTIVE" ? (
                <CustomButton
                  onClick={onChangeStatusItem(item.id, "deleteWeatherItem")}
                  name={"Удалить"}
                  smallbutton={true}
                />
              ) : (
                <CustomButton
                  onClick={onChangeStatusItem(item.id, "restoreWeatherItem")}
                  name={"Востановить"}
                  smallbutton={true}
                />
              )}
            </TableRowCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
};
