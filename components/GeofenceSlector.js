
import React from 'react'

import MapView from 'react-native-maps';
import { 
  StyleSheet,
  View,
} from 'react-native';

import {
  Surface,
  Text,
  Colors,
} from 'react-native-paper'


const regionFromLocation = ({
  longitude,
  latitude,
  longitudeDelta,
  latitudeDelta
}) => ({
  longitude,
  latitude,
  longitudeDelta: 0.001,
  latitudeDelta: 0.001,
})

export default ({
  style,
  center, 
  setCenter
}) => {

  const region = center && regionFromLocation(center)
  return (
    <Surface 
    style={style}>
      { center && (
        <MapView
        style={styles.map}
        initialRegion={region}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        onRegionChangeComplete={setCenter}
        />
      )}

      <View 
      pointerEvents='none'
      style={styles.overlay}>
        <View
        style={styles.circle}/>
      </View>

      
    </Surface>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',

  },
  circle: {
    opacity: 0.3,
    height: 100,
    width: 100,
    backgroundColor: Colors.grey500,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.grey900,
  }
})