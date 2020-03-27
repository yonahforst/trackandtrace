import {
  PERMISSIONS_UPDATED,
} from '../constants'

const initialState = {
  permissionStatus: null,
  isLoading: false,
}

export default (state=initialState, {
  type,
  payload={},
}) => {

  switch (type) {
    case PERMISSIONS_UPDATED:
      return {
        ...state,
        permissionStatus: payload.permissions.beacon || state.permissionStatus
      }
    
    default:
      return state
      
  }


}