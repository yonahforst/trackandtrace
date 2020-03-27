import {
  START_TRACKING_LOCATION,
  STOP_TRACKING_LOCATION,
  CLEAR_LOCATION_BUFFER,
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

  switch (type) {
    case START_TRACKING_LOCATION:

      return {
        ...state,
        isTrackingLocation: true,
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
          ...payload.locations,
        ]
      }

    case CLEAR_LOCATION_BUFFER:
      return {
        ...state,
        locationBuffer: []
      }

    default:
      return state
      
  }


}