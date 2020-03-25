import {
  START_TRACKING_LOCATION,
  STOP_TRACKING_LOCATION,
  LOCATION_UPDATED,
  DELETE_TRIPS,
  ADD_TRIP,
} from '../constants'

const initialState = {
  locationBuffer: [],
  pastTripIds: []
}

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
        locationBuffer: [],
      }

    case STOP_TRACKING_LOCATION:
      return {
        ...state,
        isTrackingLocation: false,
      }

    case DELETE_TRIPS:
      return {
        ...state,
        pastTripIds: state.pastTripIds.filter(id => !payload.tripIds.includes(id))
      }

    case ADD_TRIP:
      return {
        ...state,
        pastTripIds: [
          ...state.pastTripIds,
          payload.tripId
        ]
      }

    case LOCATION_UPDATED:
      return {
        ...state,
        locationBuffer: [
          ...state.locationBuffer,
          ...payload.locations.filter(l => l.coords.speed >= 0), //ignore negative values? they are causing some problems on the simulator. not sure about the real world
        ]
      }

    default:
      return state
      
  }


}