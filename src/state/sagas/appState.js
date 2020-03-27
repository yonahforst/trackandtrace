import { 
  put,
  take,
  call,
  cancelled,
} from 'redux-saga/effects'

import { 
  eventChannel 
} from 'redux-saga'

import {
  AppState
} from 'react-native'

import {
  APP_STATE_CHANGED,  
} from '../constants'


function appStateChannel() {
  return eventChannel(emitter => {
    const listener = AppState.addEventListener('change', emitter)

    return () => removeEventListener('change', listener)
  })
}



export default function* watchAppState() {
  const chan = yield call(appStateChannel)

  try {    
    while (true) {
      const appState = yield take(chan)
      yield put({
        type: APP_STATE_CHANGED,
        payload: {
          appState,
        }
      })
    }
  } finally {
    if (yield cancelled())
      chan.close()
  }
}