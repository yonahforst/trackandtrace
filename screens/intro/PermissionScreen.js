import React, {
  useEffect,
  useState,
} from 'react'

import {
  View,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native'

import {
  LOCATION,
  // NOTIFICATIONS,
  
} from 'expo-permissions'

import i18n from 'i18n-js'


import PermissionCard from '../../components/PermissionCard'
import NavigationBar from '../../components/NavigationBar'

export default ({
  permissions,
  askPermission,
  checkPermissions,
  onPrev,
  onNext,
}) => {

  const [ mockBlePermission, setMockBlePermission ] = useState({ status: 'undetermiend' })

  useEffect(() => {
    checkPermissions()
  }, [])
  const canGoToNext = permissions[LOCATION] && permissions[LOCATION].status == 'granted' 

  return (
    <View
    style={styles.container}>
      <View
      style={styles.innerContainer}>
        <PermissionCard
        title={i18n.t('intro_permission_location_title')}
        content={i18n.t('intro_permission_location_content')}
        icon='map-marker'
        permission={permissions[LOCATION] || {}}
        onRequestPermission={() => askPermission(LOCATION)}
        />

        <PermissionCard
        title={i18n.t('intro_permission_ble_title')}
        content={i18n.t('intro_permission_ble_content')}
        icon='bluetooth-audio'
        permission={mockBlePermission}
        onRequestPermission={() => setMockBlePermission({ status: 'granted' })}
        />
      </View>

      <NavigationBar
      onPrev={onPrev}
      onNext={canGoToNext && onNext}/>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

})