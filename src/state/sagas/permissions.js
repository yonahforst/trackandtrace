import { 
  put,
  takeEvery,
  takeLatest,
  call,
} from 'redux-saga/effects'

  import {
  CHECK_PERMISSIONS,
  ASK_PERMISSION,
  PERMISSIONS_UPDATED,
} from '../constants'

import * as ExpoPermissions from 'expo-permissions';

function* checkPermissions() {

  const { 
    permissions, 
  } = yield call(
    ExpoPermissions.getAsync, 
    ExpoPermissions.NOTIFICATIONS,
    ExpoPermissions.LOCATION,
  )

  yield put({
    type: PERMISSIONS_UPDATED,
    payload: {
      permissions,
    }
  })
}

function* askPermission ({
  payload: {
    permission,
  }
}) {

  const { 
    permissions 
  } = yield call(ExpoPermissions.askAsync, permission)

  yield put({
    type: PERMISSIONS_UPDATED,
    payload: {
      permissions,
    }
  })
}

export default function* () {
  yield takeLatest(CHECK_PERMISSIONS, checkPermissions)
  yield takeEvery(ASK_PERMISSION, askPermission)

}