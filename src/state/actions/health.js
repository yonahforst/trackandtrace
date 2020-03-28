import {
  SUBMIT_REPORT
} from '../constants'

export const submitReport = ({
  consent,
  symptoms,
}) => ({
  type: SUBMIT_REPORT,
  payload: {
    consent,
    symptoms,
  }
})