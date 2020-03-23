import { 
  DELETE_TRIPS,
} from "../constants";

export const deleteTrips = (ids) => ({
  type: DELETE_TRIPS,
  payload: {
    ids,
  }
})