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

  //ignore negative values.
  const filteredLocations = locations.filter(l => l.coords.speed >= 0)
  if (filteredLocations.length == 0)
    return

  store.dispatch({
    type: LOCATION_UPDATED,
    payload: {
      locations: filteredLocations,
    },
  })
  

})
