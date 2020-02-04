import { Route, Switch } from "react-router-dom";
import React, { FC } from "react";
import { routes } from "./routes";
import "../node_modules/antd/dist/antd.css";

const App = () => (
    <div className="container">
      <Switch>
        {routes.map((route) => (
          <Route
            {...route}
            key={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  );

export default App;
