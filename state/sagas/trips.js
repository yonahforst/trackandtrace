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
  TOGGLE_SHOULD_TRACK_LOCATION,
  ADD_TRIP,
  DELETE_TRIPS,
  CLEAR_LOCATION_BUFFER,
} from '../constants'

import * as SecureStorage from '../../api/secureStorage'

function* setGeofence({
  payload: {
    coordinates: {
      longitude,
      latitude,
    }
  }
}) {

  yield delay(500) //debounce

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

  const {
    user: {
      shouldTrackLocation
    }
  } = yield select()

  if (eventType === Location.GeofencingEventType.Enter) {
    yield put({
      type: STOP_TRACKING_LOCATION,
    })
  } else if (shouldTrackLocation && eventType === Location.GeofencingEventType.Exit) {
    yield put({
      type: START_TRACKING_LOCATION,
    })
  }
}

function* toggleShouldTrackLocation() {

  const {
    user: {
      shouldTrackLocation,
      lastGeofenceEvent,
    }
  } = yield select()

  if (!shouldTrackLocation) {
    yield put({
      type: STOP_TRACKING_LOCATION,
    })
  } else if (lastGeofenceEvent === Location.GeofencingEventType.Exit ) {
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

  const {
    trips: {
      locationBuffer,
    }
  } = yield select()

  if (locationBuffer.length == 0)
    return

  const tripId = locationBuffer[0].timestamp.toString()
  const stringified = JSON.stringify(locationBuffer)

  yield call(SecureStorage.setItem, tripId, stringified)

  yield put({
    type: ADD_TRIP,
    payload: {
      tripId
    }
  })

  yield put({
    type: CLEAR_LOCATION_BUFFER,
  })

}

function* deleteTrips({
  payload: {
    tripIds
  }
}) {
  for (const tripId of tripIds) {
    yield call(SecureStorage.removeItem, tripId)
  }
}

export default function* () {
  yield takeLatest(SET_GEOFENCE, setGeofence)
  yield takeLatest(GEOFENCE_TRIGGERED, geofenceTriggered)
  yield takeLatest(START_TRACKING_LOCATION, startTrackingLocation)
  yield takeLatest(STOP_TRACKING_LOCATION, stopTrackingLocation)
  yield takeLatest(TOGGLE_SHOULD_TRACK_LOCATION, toggleShouldTrackLocation)
  yield takeEvery(DELETE_TRIPS, deleteTrips)
}