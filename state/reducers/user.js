import {
  SET_GEOFENCE,
  SET_SHOW_INTRO,
} from '../constants'

const initialState = {
  showIntro: true,
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

    default:
      return state
  }


}