import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {LoginReducer} from "../../../native/src/screens/login/Redux/reducers/LoginReducer"

const rootReducer = combineReducers({
  login : LoginReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};

const store = createStore(rootReducer, applyMiddleware(thunk));

export {store};