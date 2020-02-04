import React, { FC, memo } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  smallbutton?: boolean;
}

export const CustomButton: FC<IProps> = memo((props) => {
  const { name, smallbutton, ...rest } = props;

  return (
    <div
      {...rest}
      className={classNames(styles.button, {
        [styles.small]: smallbutton || false,
      })}
    >
      {name}
    </div>
  );
});
