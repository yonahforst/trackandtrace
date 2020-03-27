import React, {
  useEffect,
} from 'react'

import {
  View,
  StyleSheet,
} from 'react-native'

import i18n from 'i18n-js'

import { 
  Text,
  Subheading,
  Surface,
} from 'react-native-paper'

import * as Location from 'expo-location';

import GeofenceSlector from '../../components/GeofenceSlector'
import NavigationBar from '../../components/NavigationBar'

export default ({
  center,
  setCenter,
  onPrev,
  onNext,
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
      <View
      style={styles.innerContainer}>
        <Subheading>
          { i18n.t('intro_geofence_title')}
        </Subheading>
        <Surface
        style={styles.geofenceContainer}>
          <GeofenceSlector
          style={styles.geofence}
          center={center}
          setCenter={setCenter}
          />
        </Surface>
        <Text>
          { i18n.t('intro_geofence_body')}
        </Text>
      </View>

      <NavigationBar
      onPrev={onPrev}
      onNext={onNext}
      nextTitle={i18n.t('finish')}/>
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
    alignItems: 'center',
  },
  geofenceContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  geofence: {
    flex: 1,
    margin: 5,
    aspectRatio: 1
  }

})