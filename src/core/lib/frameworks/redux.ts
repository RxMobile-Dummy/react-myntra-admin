// import {applyMiddleware, combineReducers, createStore} from 'redux';
// import thunk from 'redux-thunk';
// import {LoginReducer} from "../../../native/src/screens/login/Redux/reducers/LoginReducer"

// const rootReducer = combineReducers({
//   login : LoginReducer
// });

// export type ApplicationState = ReturnType<typeof rootReducer>;

// export {rootReducer};

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export {store};

import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga, userReducer } from "../adapters/redux";

const rootReducer = {
  user: userReducer,
};

export const configureStore = () => {
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();

  middleware.push(sagaMiddleware);
  if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
  }

  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(...middleware),
  );

  sagaMiddleware.run(rootSaga);
  return store;
};