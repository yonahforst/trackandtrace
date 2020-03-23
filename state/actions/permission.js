import {
  CHECK_PERMISSIONS,
  ASK_PERMISSION,
} from '../constants'

export const checkPermissions = () => ({
  type: CHECK_PERMISSIONS,
})

export const askPermission = (permission) => ({
  type: ASK_PERMISSION,
  payload: {
    permission,
  }
})