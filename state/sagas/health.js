import { 
  put,
  takeEvery,
  takeLatest,
  delay,
  call,
} from 'redux-saga/effects'

import {
  SUBMIT_REPORT,
  SUBMIT_REPORT_PENDING,
  SUBMIT_REPORT_SUCCESS,
  SUBMIT_REPORT_FAILED,
} from '../constants'

function* submitReport({
  payload: {
    hasCovid,
    referenceNumber,
  }
}) {

  yield put({
    type: SUBMIT_REPORT_PENDING,
  })

  try {
    yield delay(2000)

    yield put({
      type: SUBMIT_REPORT_SUCCESS,
      payload: {
        hasCovid,
        referenceNumber,
      }
    })


  } catch (error) {
    yield put({
      type: SUBMIT_REPORT_FAILED,
      payload: {
        error,
      }
    })
  }
}


export default function* () {
  yield takeLatest(SUBMIT_REPORT, submitReport)
}