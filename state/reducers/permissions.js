import {
  PERMISSIONS_UPDATED,
} from '../constants'

const initialState = {
}

export default (state=initialState, {
  type,
  payload={},
}) => {

  switch (type) {
    case PERMISSIONS_UPDATED:
      return {
        ...state,
        ...payload.permissions,
      }

    default:
      return state
  }


}