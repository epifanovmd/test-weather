import React, { FC } from "react";
import styles from "./styles.module.scss";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const CustomButton: FC<IProps> = (props) => {
  return (
    <div {...props} className={styles.button}>
      {props.name}
    </div>
  );
};
