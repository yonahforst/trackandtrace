import {
  SUBMIT_REPORT
} from '../constants'

export const submitReport = ({
  referenceNumber,
  hasCovid,
}) => ({
  type: SUBMIT_REPORT,
  payload: {
    referenceNumber,
    hasCovid,
  }
})