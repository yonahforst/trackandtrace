import * as Geo from 'geolib';

import * as D3 from 'd3-polygon'


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
  const stops = trip.reduce(stopReducer, [])
  return stops.map(points => ({
    startedAt: points[0].timestamp,
    endedAt: points[points.length-1].timestamp,
    polygon: boundingPolygonFromPoints(points),
  }))
}


const stopReducer = (acc, cur, idx, src) => {
  if (idx == 0) 
    return acc// for the first element, there's no last point
  
  const stoppedNow = isStopped(cur, src[idx-1])
  const wasStopped = src[idx-2] && isStopped(src[idx-1], src[idx-2])

  if (!wasStopped && stoppedNow) // if you just stopped
    acc.push([ src[idx-1], cur ])

  if (wasStopped && stoppedNow) // if you're still stopped
    acc[acc.length -1].push(cur) 

  return acc
}

const isStopped = (pointA, pointB) => {
  return distanceBetweenPoints(pointA, pointB) / secondsBetweenPoints(pointA, pointB) < avgWalkingSpeedInMetersPerSecond 
}

const distanceBetweenPoints = (pointA, pointB) => Geo.getDistance(pointA.coords, pointB.coords)
const secondsBetweenPoints = (pointA, pointB) => Math.abs(pointA.timestamp - pointB.timestamp)/1000


const boundingPolygonFromPoints = points => {
  const coordinateArray = points.map(p => coordObjToCoordArray(p.coords))
  const polygonArray = D3.polygonHull(coordinateArray) || coordinateArray //d3 returns null for less than 3 points
  return polygonArray.map(coordArrayToCoordObj)
}
 
const coordObjToCoordArray = ({ longitude, latitude }) => [ longitude, latitude ]
const coordArrayToCoordObj = ([ longitude, latitude ]) => ({ longitude, latitude })

export const getDistance  = Geo.getDistance