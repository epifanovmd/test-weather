import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Weather } from "./modules/weather/weather";

export interface IRoute {
  path: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    component: Weather,
    exact: true,
  },
];
