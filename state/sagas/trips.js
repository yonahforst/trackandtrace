import { 
  put,
  takeEvery,
  takeLatest,
  call,
  delay,
  select,
} from 'redux-saga/effects'

import * as Location from 'expo-location'

import {
  SET_GEOFENCE,
  GEOFENCE_TASK,
  GEOFENCE_TRIGGERED,
  BACKGROUND_LOCATION_TASK,
  START_TRACKING_LOCATION,
  STOP_TRACKING_LOCATION,
} from '../constants'

function* setGeofence({
  payload: {
    coordinates: {
      longitude,
      latitude,
    }
  }
}) {

  yield call(Location.startGeofencingAsync, GEOFENCE_TASK, [{
    longitude,
    latitude,
    radius: 100,
  }])
}

function* geofenceTriggered({
  payload: {
    eventType, 
  }
}) {
  yield delay(1000) //debounce

  if (eventType === Location.GeofencingEventType.Enter) {
    yield put({
      type: STOP_TRACKING_LOCATION,
    })
  } else if (eventType === Location.GeofencingEventType.Exit) {
    yield put({
      type: START_TRACKING_LOCATION,
    })
  }

}

function* startTrackingLocation() {
 yield call(Location.startLocationUpdatesAsync, BACKGROUND_LOCATION_TASK, {
   accuracy: Location.Accuracy.High,
   deferredUpdatesInterval: 1 * 60 * 1000,
   deferredUpdatesDistance: 10
 })
}

function* stopTrackingLocation() {
  const isTracking = yield call(Location.hasStartedLocationUpdatesAsync, BACKGROUND_LOCATION_TASK)
  
  if (isTracking)
    yield call(Location.stopLocationUpdatesAsync, BACKGROUND_LOCATION_TASK)

}

export default function* () {
  yield takeLatest(SET_GEOFENCE, setGeofence)
  yield takeLatest(GEOFENCE_TRIGGERED, geofenceTriggered)
  yield takeLatest(START_TRACKING_LOCATION, startTrackingLocation)
  yield takeLatest(STOP_TRACKING_LOCATION, stopTrackingLocation)
}