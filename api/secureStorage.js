import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

import {
  AsyncStorage
} from 'react-native'

import ab2s from 'arraybuffer-to-string'
import CryptoJS from 'crypto-js'

const KEY = 'SECURE_STORAGE-RANDOM_PASSWORD_KEY'

const generateRandomPassword = async () => {
  const byteArray = await Random.getRandomBytesAsync(256)
  return ab2s(byteArray, 'base64')
}

const getPassword = async ({ 
  shouldGenerate 
}={}) => {
  let password = await SecureStore.getItemAsync(KEY)

  if (!password) {

    if (!shouldGenerate)
      throw new Error('password not found')

    password = await generateRandomPassword()

    await SecureStore.setItemAsync(KEY, password, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    })
  }

  return password
}

export const setItem = async (key, value) => {
  const password = await getPassword({
    shouldGenerate: true,
  })

  const encryptedValue = CryptoJS.AES.encrypt(value, password).toString()
  
  const res = await AsyncStorage.setItem(key, encryptedValue)

} 

export const getItem = async (key) => {
  const encryptedValue = await AsyncStorage.getItem(key)

  if (!encryptedValue)
    return

  const password = await getPassword()

  const bytes  = CryptoJS.AES.decrypt(encryptedValue, password)
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8)

  return decryptedValue
}

export const removeItem = async (key) => {
  await AsyncStorage.removeItem(key)
}