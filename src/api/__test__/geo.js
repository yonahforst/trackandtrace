import tap from 'tap'
const { test } = tap

import {
  getStopsFromTrip
} from '../geo.js'


const trip = [{
  coords: {
    longitude: 1.11111,
    latitude: 1.11111,
  },
  timestamp: 11111,
}, {
  coords: {
    longitude: 2.22222,
    latitude: 2.22222,
  },
  timestamp: 22222,
}, {
  coords: {
    longitude: 2.22223,
    latitude: 2.22223,
  },
  timestamp: 33333,
}, {
  coords: {
    longitude: 3.33333,
    latitude: 3.33333,
  },
  timestamp: 33333,
}]

test('getStopsFromTrip', async assert => {
  const expected = [{
    startedAt: 22222,
    endedAt: 33333,
    polygon: [{
      longitude: 2.22222,
      latitude: 2.22222,
    }, {
      longitude: 2.22223,
      latitude: 2.22223,
    }],
  }]

  const result = getStopsFromTrip(trip)
  assert.deepEquals(result, expected)
})