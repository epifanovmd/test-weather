import React, { FC, memo } from "react";
import styles from "./styles.module.scss";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touch?: boolean;
  title: string;
}

export const CustomInput: FC<IProps> = (props) => {
  const { title, touch, error, name, ...rest } = props;

  return (
    <div>
      {title && (
        <label className={styles.title} htmlFor={name}>
          {title}
        </label>
      )}
      <input name={name} {...rest} />
      {error && touch && <div>{error}</div>}
    </div>
  );
};
