import * as TaskManager from 'expo-task-manager';

import {
  store
} from '../state/store'

import { 
  BACKGROUND_LOCATION_TASK,
  LOCATION_UPDATED,
} from '../state/constants';

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ 
  data: { 
    locations, 
  }, 
  error,
}) => {
  if (error)
    console.error(error)
  
  store.dispatch({
    type: LOCATION_UPDATED,
    payload: {
      locations,
    },
  })
  

})
