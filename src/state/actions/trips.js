import { 
  DELETE_TRIPS,
  ADD_TRIP,
} from "../constants";

export const deleteTrips = (tripIds) => ({
  type: DELETE_TRIPS,
  payload: {
    tripIds,
  }
})

export const addTrip = tripId => ({
  type: ADD_TRIP,
  payload: {
    tripId,
  }
})