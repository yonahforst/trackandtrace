import { 
  getDistance,
  getCenter,
} from 'geolib';

//https://en.wikipedia.org/wiki/Preferred_walking_speed
const avgWalkingSpeedInMetersPerSecond = 1.33
const timeBetweenStopsInSeconds = 30
const minStopDurationInSeconds = 10


// take a group of minStopDurationInSeconds worth of points
// measure the distance between the first and last point
// if it's less than 7.5 (~0.5 * 1.33 * 10 ), mark the index as the start.
// continue in groups of 10 until the first point is more than 7.5 in distance 
// add all points since the start point to the array of stops and restart


//IDEAS:
//each coordinate also contains a speed attribute in m/s. Should we use that instead?

export const getStopsFromTrip = trip => {
  const stopIndexes = getStopIndexesFromTrip(trip)
  
  const stops = trip.filter((c, i) => stopIndexes.includes(i))

  return stops
}

export const getStopIndexesFromTrip = trip => {
  const indexes = []
  let isStopped = false
  
  for (let i = 1; i < trip.length; i++) {
    const lastPoint = trip[i-1]
    const point = trip[i]

    const timeDifferenceSeconds = (point.timestamp - lastPoint.timestamp)/1000
    const distance = getDistance(point.coords, lastPoint.coords)
    
    isStopped = distance < avgWalkingSpeedInMetersPerSecond * timeDifferenceSeconds

    if (isStopped)
      indexes.push(i)
  }

  return indexes
}