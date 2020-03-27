import React from 'react'
import i18n from 'i18n-js'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroConnector from '../intro/IntroConnector'
import HomeConnector from '../home/HomeConnector'
import TripsConnector from '../trips/TripsConnector'
import HealthConnector from '../health/HealthConnector'
// import TripDetailConnector from '../tripDetail/TripDetailConnector'

import PaperTheme from '../../constants/Theme'
import TripDetailScreen from '../tripDetail/TripDetailScreen';

const Stack = createStackNavigator();

const NavigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PaperTheme.colors.primary,
  },
}

export default ({
  showIntro,
}) => {

  return (
    <NavigationContainer
    theme={NavigatorTheme}>
      <Stack.Navigator 
      initialRouteName="home">
        { showIntro ? (
          <Stack.Screen 
          name="intro" 
          component={IntroConnector} 
          options={{ title: i18n.t('nav_intro') }}
          />
        ) : (
          <>
          <Stack.Screen 
          name="home" 
          component={HomeConnector} 
          options={{ title: i18n.t('nav_home') }}
          />
          <Stack.Screen 
          name="trips" 
          component={TripsConnector} 
          options={{ title: i18n.t('nav_trips') }}
          />
          <Stack.Screen 
          name="health" 
          component={HealthConnector} 
          options={{ title: i18n.t('nav_health') }}
          />
          <Stack.Screen 
          name="tripDetail" 
          component={TripDetailScreen} 
          options={({ route }) => ({ 
            title: i18n.strftime(new Date(parseInt(route.params.tripId)), '%a %-d-%b %-H:%M')
          })}
          />
          
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}