import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

import {
  AsyncStorage
} from 'react-native'

import ab2s from 'arraybuffer-to-string'
import CryptoJS from 'crypto-js'

const generateRandomPassword = async () => {
  const byteArray = await Random.getRandomBytesAsync(256)
  return ab2s(byteArray, 'base64')
}


const getPasswordWithPrefix = async (prefix, {
  shouldGenerate
}={}) => {

  const key = prefix + '_RANDOM_PASSWORD'

  let password = await SecureStore.getItemAsync(key)

  if (!password) {

    if (!shouldGenerate)
      throw new Error('password not found')

    password = await generateRandomPassword()

    await SecureStore.setItemAsync(key, password, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    })
  }

  return password
}

const setItemWithPrefix = prefix => async (key, value) => {
  const password = await getPasswordWithPrefix(prefix, {
    shouldGenerate: true,
  })

  const encryptedValue = CryptoJS.AES.encrypt(value, password).toString()
  
  await AsyncStorage.setItem(prefix + key, encryptedValue)

} 

const getItemWithPrefx= prefix => async (key) => {
  const encryptedValue = await AsyncStorage.getItem(prefix + key)

  if (!encryptedValue)
    return

  const password = await getPasswordWithPrefix(prefix)

  const bytes  = CryptoJS.AES.decrypt(encryptedValue, password)
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8)

  return decryptedValue
}

const removeItemWithPrefix = prefix => async (key) => {
  await AsyncStorage.removeItem(prefix + key)
}

export const init = (prefix) => ({
  getItem: getItemWithPrefx(prefix),
  setItem: setItemWithPrefix(prefix),
  removeItem: removeItemWithPrefix(prefix),
})