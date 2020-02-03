import { applyMiddleware, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { createMainReduce } from "./reducers";
import { IAppState } from "./IAppState";
import { composeWithDevTools } from "redux-devtools-extension";

export interface IExtraArguments {}

const middleware =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(
        applyMiddleware(thunkMiddleware.withExtraArgument<IExtraArguments>({})),
      )
    : applyMiddleware(thunkMiddleware.withExtraArgument<IExtraArguments>({}));

const reducers = createMainReduce();

export const createSimpleStore = (initialState?: IAppState) => {
  return createStore(reducers, initialState, middleware);
};
