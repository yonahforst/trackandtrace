import { all } from 'redux-saga/effects'
import permissionsSaga from './permissions'
import healthSaga from './health'
import tripsSaga from './trips'
import appStateSaga from './appState'
export default function* rootSaga() {
  yield all([
    permissionsSaga(),
    healthSaga(),
    tripsSaga(),
    appStateSaga()
  ])
}
