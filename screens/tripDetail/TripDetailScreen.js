import React, {
  useRef,
} from 'react'

import {
  View, 
  StyleSheet,
} from 'react-native'

import {
  Colors
} from 'react-native-paper'

import MapView, { 
  Polyline,
} from 'react-native-maps';

import {
  getStopIndexesFromTrip
} from '../../api/geo'

const edgePadding = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
}

export default ({
  trip
}) => {
  const mapRef = useRef(null)
  const coordinates = trip.map(i => i.coords)
  const stopIndexes = getStopIndexesFromTrip(trip)
  const strokeColors = coordinates.map((e, i) => stopIndexes.includes(i) ? Colors.red500 : Colors.green400 )

  const onMapReady = () => mapRef.current.fitToCoordinates(coordinates, {
    edgePadding
  })
  
  return (
    <View 
    style={styles.container}>
      <MapView
      ref={mapRef}
      style={styles.map}
      onMapReady={onMapReady}
      zoomEnabled={true}
      rotateEnabled={false}
      pitchEnabled={false}>

        <Polyline
        coordinates={coordinates}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={strokeColors}
        strokeWidth={5}
        />
  

      </MapView>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  map: {
    ...StyleSheet.absoluteFill,
  }
})