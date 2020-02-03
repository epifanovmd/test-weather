import React, { FC, memo, useCallback, useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { EventNames, eventRegister } from "../../common/eventRegister";
// import cn from "classnames";
// import styles from "./styles.module.scss";

interface IState extends INotificationPopupData {
  isOpen: boolean;
}

export interface INotificationPopupData {
  title: string;
  subtitle: string;
  iconType: "none" | "error" | "warning" | "success";
}

export const PopupNotification: FC = memo(() => {
  let listenerId: string;
  const [state, setState] = useState({
    isOpen: false,
    subtitle: "",
    title: "",
    iconType: "none",
  });

  useEffect(() => {
    listenerId = eventRegister.addEventListener(
      EventNames.notification,
      (data: INotificationPopupData): void => {
        setState({ ...data, isOpen: true });
      },
    );

    return () => {
      eventRegister.removeEventListener(listenerId);
    };
  }, []);

  const onClose = useCallback(() => {
    setState({ ...state, isOpen: false });
  }, [state.isOpen]);

  const { title, subtitle, iconType, isOpen } = state;
  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      animationDuration={150}
      showCloseIcon={false}
      open={isOpen}
      onClose={onClose}
      center={true}
    >
      <div>
        <div>{title}</div>
        <div>{subtitle}</div>
        <button onClick={onClose}>{"ОК"}</button>
      </div>
    </Modal>
  );
});
