import React, {
  useRef, useState, useEffect,
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

import * as SecureStorage from '../../api/secureStorage'

const edgePadding = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
}

const secured = SecureStorage.init('TRIPS')



export default ({
  route: {
    params: {
      tripId,
    }
  }
}) => {
  const mapRef = useRef(null)
  const [ coordinates, setCoordinates ] = useState()
  const [ strokeColors, setStrokeColors ] = useState()

  useEffect(() => {
    getTripDetails(tripId)
  }, [ tripId ])

  const getTripDetails = async (tripId) => {
    const trip = await secured.getItem(tripId)
    const parsedTrip = JSON.parse(trip)
    const coords = parsedTrip.map(i => i.coords)
    const stopIndexes = getStopIndexesFromTrip(parsedTrip)
    const colors = coords.map((e, i) => stopIndexes.includes(i) ? Colors.red500 : Colors.green400 )

    setStrokeColors(colors)
    setCoordinates(coords)
  }
  
  const onMapReady = () => mapRef.current.fitToCoordinates(coordinates, {
    edgePadding
  })
  
  return (
    <View 
    style={styles.container}>
    { coordinates && (
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
    )}
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