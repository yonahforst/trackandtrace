import { AppLoading } from 'expo';
import React from 'react';
import { StatusBar } from 'react-native'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react'

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import {
  store,
  persistor,
} from './state/store'

import translations from './translations'
import NavigationConnector from './screens/nav/NavigationConnector'

import './tasks/geofenceTask'
import './tasks/backgroundLocationTask'

i18n.locale = Localization.locale;
i18n.translations = translations;
i18n.fallbacks = true;

export default function App() {

  return (
    <StoreProvider store={store}>
      <StatusBar barStyle="dark-content" />

      <PersistGate loading={<AppLoading/>} persistor={persistor}>
        <PaperProvider>
          <NavigationConnector />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}