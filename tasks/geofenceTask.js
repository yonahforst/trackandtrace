// import * as TaskManager from 'expo-task-manager';

import {
  store
} from '../state/store'

import { 
  GEOFENCE_TASK,
  GEOFENCE_TRIGGERED,
} from '../state/constants';

// TaskManager.defineTask(GEOFENCE_TASK, ({ 
//   data: { 
//     eventType, 
//     region,
//   }, 
//   error,
// }) => {
//   if (error)
//     console.error(error)

//   store.dispatch({
//     type: GEOFENCE_TRIGGERED,
//     payload: {
//       eventType,
//       region
//     }
//   })
// })
