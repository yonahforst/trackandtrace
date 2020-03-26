import { 
  put,
  takeEvery,
  takeLatest,
  call,
  delay,
  select,
  fork,
} from 'redux-saga/effects'

import cuid from 'cuid'
import Discovery from 'react-native-discovery'
import {
  DeviceEventEmitter
} from 'react-native'


import * as SecureStorage from '../../api/secureStorage'

const secured = SecureStorage.init('ble')

const uniqueIdKey = 'myUniqueId'
const appId = 'e3ed53e6-4cd4-4057-9bae-aef59c7b804c'

const getStorageKeyForDay = () => new Date().toISOString().split('T')[0]
// Listen for discovery changes
DeviceEventEmitter.addListener('discoveredUsers', async ({
  uuid,
  didChange,
  users,
}) => {
  if (uuid == appId && didChange) {
    const key = getStorageKeyForDay()
    const existing = await secured.getItem(key) || '[]'
    await secured.setItem(key, JSON.stringify([
      ...JSON.parse(existing),
      ...users
    ]))
  }
})


const findOrCreateUniqueId = async () => {
  let id = await secured.getItem(uniqueIdKey)

  if (!id) {
    id = cuid()
    await secured.setItem(uniqueIdKey, id)
  }

  return id
}

function* advertiseAndDiscoveryBle() {
  const myId = yield call(findOrCreateUniqueId)
  Discovery.initialize(appId, myId)
  Discovery.setShouldAdvertise(appId, true)
  Discovery.setShouldDiscover(appId, true)
}

export default function*() {
  yield fork(advertiseAndDiscoveryBle)
}