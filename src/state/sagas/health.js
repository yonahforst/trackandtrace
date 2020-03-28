import { 
  put,
  takeEvery,
  takeLatest,
  select,
  delay,
  call,
} from 'redux-saga/effects'

import {
  SUBMIT_REPORT,
  SUBMIT_REPORT_PENDING,
  SUBMIT_REPORT_SUCCESS,
  SUBMIT_REPORT_FAILED,
} from '../constants'

import {
  uploadReportToS3,
} from '../../api/aws'

import {
  getStopsFromTrip
} from '../../api/geo'

function* submitReport({
  payload: {
    symptoms,
  }
}) {

  yield put({
    type: SUBMIT_REPORT_PENDING,
  })

  try {
    const {
      trips: {
        history
      }
    } = yield select()

    const stops = []

    for (const id in history) {
      const stop = yield call(getStopsFromTrip, history[id])
      stops.push(stop)
    }

    yield call(uploadReportToS3, {
      stops,
      symptoms,
    })

    yield put({
      type: SUBMIT_REPORT_SUCCESS,
      payload: {
        symptoms
      }
    })


  } catch (error) {
    console.warn(error)
    yield put({
      type: SUBMIT_REPORT_FAILED,
      payload: {
        error: error.message,
      }
    })
  }
}


export default function* () {
  yield takeLatest(SUBMIT_REPORT, submitReport)
}