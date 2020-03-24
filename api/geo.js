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

export const getStopsFromRoute = coordinates => {
  const stops = []

  let startIndex = 0
  
  for (let i = 2; i < coordinates.length; i++) {
    const startPoint = coordinates[startIndex]
    const point = coordinates[i]
    const timeDifference = point.timestamp - startPoint.timestamp

    if (timeDifference < minStopDurationInSeconds * 1000)
      continue;
    
    
    const distance = getDistance(point.coords, startPoint.coords)

    if (distance < avgWalkingSpeedInMetersPerSecond * minStopDurationInSeconds)
      stops.push(coordinates.slice(startIndex, i))
    
    
    startIndex = i
  }

  return stops
}