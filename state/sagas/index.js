import { all } from 'redux-saga/effects'
import permissionsSaga from './permissions'
import healthSaga from './health'
import tripsSaga from './trips'

export default function* rootSaga() {
  yield all([
    permissionsSaga(),
    healthSaga(),
    tripsSaga(),
  ])
}
