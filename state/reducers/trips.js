import {
  START_TRACKING_LOCATION,
  STOP_TRACKING_LOCATION,
  LOCATION_UPDATED,
  DELETE_TRIPS,
} from '../constants'

const initialState = {
  currentTripId: null,
  history: {},
}
const omitKeys = (obj, keys) => Object.keys(obj)
  .filter(k => !keys.includes(k))
  .reduce((p,c) => ({ ...p, [c]: obj[c] }), {})

export default (state=initialState, {
  type,
  payload={},
}) => {

  const now = Date.now()
  switch (type) {
    case START_TRACKING_LOCATION:
      return {
        ...state,
        isTrackingLocation: true,
        currentTripId: now,
        history: {
          ...state.history,
          [ now ]: []
        }
      }

    case STOP_TRACKING_LOCATION:
      return {
        ...state,
        isTrackingLocation: false,
        currentTripId: null,
      }

    case DELETE_TRIPS:
      return {
        ...state,
        history: omitKeys(state.history, payload.ids)
      }

    case LOCATION_UPDATED:
      const {
        history={},
        currentTripId,
      } = state

      if (!currentTripId)
        return state

      return {
        ...state,
        history: {
          ...history,
          [ currentTripId ]: [
            ...history[ currentTripId ],
            ...payload.locations.filter(l => l.coords.speed >= 0), //ignore negative values? they are causing some problems on the simulator. not sure about the real world
          ]
        }
      }

    default:
      return state
      
  }


}