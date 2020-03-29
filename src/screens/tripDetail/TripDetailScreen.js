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
  Polygon,
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

const StopMarker = ({
  coordinates,
  ...props
}) => {

  coordinates= coordinates.map(({
    longitude,
    latitude
  }) => ({
    longitude: longitude + Math.random()*0.000001,
    latitude: latitude + Math.random()*0.000001,
  }))

  if (coordinates.length > 2)
    return (
      <Polygon
      coordinates={coordinates}
      {...props}
      />
    )

  return (
    <Polyline
    coordinates={coordinates}
    {...props}
    />
  )

}

export default () => {
  const mapRef = useRef(null)
  const [ stops, setStops ] = useState()

  useEffect(() => {
    getStops()
  }, [])

  const getStops = async () => {
    const stops = await SecureStorage.getItem('stops')
    setStops(stops)
  }
 
  const onMapReady = () => {
    const coordinates = stops.reduce((p, c) => [...p, ...c.polygon], [])
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding
    })
  }
  
  return (
    <View 
    style={styles.container}>
    { stops && (
      <MapView
      ref={mapRef}
      style={styles.map}
      onMapReady={onMapReady}
      zoomEnabled={true}
      showsUserLocation={true}
      rotateEnabled={false}
      pitchEnabled={false}>

      {stops.map(stop => (
        <StopMarker
        strokeWidth={10}
        strokeColor='red'
        key={stop.startedAt}
        coordinates={stop.polygon}

        />
      ))}  

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