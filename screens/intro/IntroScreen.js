import React, {
  useState,
} from 'react'

import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native'

import { 
  Button 
} from 'react-native-paper'

import PermissionScreen from './PermissionScreen'
import GeofenceScreen from './GeofenceScreen'

import useStep from '../../hooks/useStep'

export default ({
  permissions,
  askPermission,
  checkPermissions,
  setGeofence,
  geofence,
  onFinishIntro,
}) => {

  const [ step, onPrev, onNext ] = useStep(1)

  

  const renderScreen = () => {
    switch (step) {
      case 0:
        return (
          <PermissionScreen
          permissions={permissions}
          askPermission={askPermission}
          checkPermissions={checkPermissions}
          onPrev={onPrev}
          onNext={onNext}
          />
        )

      case 1:
        return (
          <GeofenceScreen
          center={geofence}
          setCenter={setGeofence}
          onPrev={onPrev}
          onNext={onFinishIntro}
          />
        )
    }
  }

  return (
    <SafeAreaView
    style={styles.container}>
      { renderScreen() }
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})