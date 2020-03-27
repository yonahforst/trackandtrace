import { 
  SET_GEOFENCE,
  SET_SHOW_INTRO,
  TOGGLE_SHOULD_TRACK_LOCATION,
} from "../constants";

export const setGeofence = (coordinates) => ({
  type: SET_GEOFENCE,
  payload: {
    coordinates
  }
})

export const setShowIntro = (showIntro) => ({
  type: SET_SHOW_INTRO,
  payload: {
    showIntro
  }
})

export const toggleShouldTrackLocation = () => ({
  type: TOGGLE_SHOULD_TRACK_LOCATION,
})