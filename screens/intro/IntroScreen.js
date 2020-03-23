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

import i18n from 'i18n-js'

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
          />
        )

      case 1:
        return (
          <GeofenceScreen
          center={geofence}
          setCenter={setGeofence}
          />
        )
    }
  }

  return (
    <SafeAreaView
    style={styles.container}>
      { renderScreen() }

      <View
      style={styles.buttonsContainer}>
        <Button 
        disabled={!onPrev}
        onPress={onPrev}>
          {i18n.t('intro_previous')}
        </Button>

        <Button 
        onPress={onNext || onFinishIntro}>
          {onNext ? i18n.t('intro_next') : i18n.t('intro_finish')}
        </Button>
      </View>
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