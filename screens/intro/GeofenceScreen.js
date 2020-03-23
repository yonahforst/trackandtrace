import React, {
  useEffect,
} from 'react'

import {
  View,
  StyleSheet,
} from 'react-native'

import i18n from 'i18n-js'

import { 
  Text 
} from 'react-native-paper'

import * as Location from 'expo-location';

import GeofenceSlector from '../../components/GeofenceSlector'

export default ({
  center,
  setCenter
}) => {

  const fetchLocation = async () => {
    const {
      coords
    } = await Location.getLastKnownPositionAsync()

    setCenter(coords)
  }
  useEffect(() => {
    if (!center)
      fetchLocation()
  }, [])

  return (
    <View
    style={styles.container}>
      <Text>
        { i18n.t('intro_geofence_drag_to_center')}
      </Text>
      <View
      style={styles.geofenceContainer}>
        <GeofenceSlector
        style={styles.geofence}
        center={center}
        setCenter={setCenter}
        />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  geofenceContainer: {
    flexDirection: 'row',
  },
  geofence: {
    flex: 1,
    margin: 20,
    aspectRatio: 1
  }

})