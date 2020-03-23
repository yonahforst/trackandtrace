import React, {
  useEffect,
} from 'react'

import {
  View,
  StyleSheet,
} from 'react-native'

import {
  LOCATION,
  NOTIFICATIONS,
  
} from 'expo-permissions'

import i18n from 'i18n-js'


import PermissionCard from '../../components/PermissionCard'


export default ({
  permissions,
  askPermission,
  checkPermissions,
}) => {

  useEffect(() => {
    checkPermissions()
  }, [])

  const hasLocationPermission = permissions[LOCATION] 
  && permissions[LOCATION].status === 'granted'

  const hasNotificationsPermission = permissions[NOTIFICATIONS] 
  && permissions[NOTIFICATIONS].status === 'granted'
  
  return (
    <View
    style={styles.container}>
      <PermissionCard
      title={i18n.t('intro_permission_location_title')}
      content={i18n.t('intro_permission_location_content')}
      icon='pin'
      hasPermission={hasLocationPermission}
      onRequestPermission={() => askPermission(LOCATION)}
      />

      <PermissionCard
      title={i18n.t('intro_permission_notifications_title')}
      content={i18n.t('intro_permission_notifications_content')}
      // icon='notification'
      hasPermission={hasNotificationsPermission}
      onRequestPermission={() => askPermission(NOTIFICATIONS)}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

})