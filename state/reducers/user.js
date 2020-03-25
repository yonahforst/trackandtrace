import {
  SET_GEOFENCE,
  SET_SHOW_INTRO,
  GEOFENCE_TRIGGERED,
  TOGGLE_SHOULD_TRACK_LOCATION,
} from '../constants'

const initialState = {
  showIntro: true,
  shouldTrackLocation: true
}

export default (state=initialState, {
  type,
  payload={},
}) => {

  switch (type) {
    case SET_GEOFENCE:
      return {
        ...state,
        geofence: payload.coordinates,
      }

    case SET_SHOW_INTRO:
      return {
        ...state,
        showIntro: payload.showIntro,
      }
    
    case TOGGLE_SHOULD_TRACK_LOCATION:
      return {
        ...state,
        shouldTrackLocation: !state.shouldTrackLocation,
      }

    case GEOFENCE_TRIGGERED:
      return {
        ...state,
        lastGeofenceEvent: payload.eventType
      }

    default:
      return state
  }


}