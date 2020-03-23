import { 
  SET_GEOFENCE,
  SET_SHOW_INTRO,
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