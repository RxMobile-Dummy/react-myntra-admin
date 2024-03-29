import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../adapters/reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)



// export const store = createStore(reducers, applyMiddleware(thunk));
