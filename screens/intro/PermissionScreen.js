import React, {
  useEffect,
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
        icon='pin'
        permission={permissions[LOCATION] || {}}
        onRequestPermission={() => askPermission(LOCATION)}
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
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

})