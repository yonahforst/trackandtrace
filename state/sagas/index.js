import { all } from 'redux-saga/effects'
import permissionsSaga from './permissions'
import healthSaga from './health'
import tripsSaga from './trips'
import bleSaga from './ble'

export default function* rootSaga() {
  yield all([
    bleSaga(),
    permissionsSaga(),
    healthSaga(),
    tripsSaga(),
  ])
}
