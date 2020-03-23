import {
  SUBMIT_REPORT_PENDING,
  SUBMIT_REPORT_SUCCESS,
  SUBMIT_REPORT_FAILED,
} from '../constants'

const initialState = {
  error: null,
  isLoading: false,
  hasCovid: false,
  referenceNumber: '',
}

export default (state=initialState, {
  type,
  payload={},
}) => {

  switch (type) {
    case SUBMIT_REPORT_PENDING:
      return {
        ...state,
        isLoading: true,
      }

    case SUBMIT_REPORT_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
        error: null,
      }

    case SUBMIT_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      }
    
    default:
      return state
      
  }


}