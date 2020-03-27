import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga'

import { persistStore, persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import createSecureStore from "redux-persist-expo-securestore";
import { AFTER_FIRST_UNLOCK } from 'expo-secure-store';

import rootReducer from './reducers'
import mySaga from './sagas'

import {
  AsyncStorage
} from 'react-native'

// you want to remove some keys before you save
const blacklistFilter = createBlacklistFilter('health', [ 'error' ])

const storage = createSecureStore({
  keychainAccessible: AFTER_FIRST_UNLOCK
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    blacklistFilter,
  ]
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const enhancer = composeWithDevTools(
  applyMiddleware(sagaMiddleware),
);

// mount it on the Store
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)

// then run the saga
sagaMiddleware.run(mySaga)

