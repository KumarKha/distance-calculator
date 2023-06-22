// Haversine
// formula:	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
// c = 2 ⋅ atan2( √a, √(1−a) )
// d = R ⋅ c
// R = Earth Radius
// φ is latitude, λ is longitude, R is earth’s radius (mean radius = * 6,371km);
// note that angles need to be in radians to pass to trig functions!

/**
 * Uses the Haversine Formula to find distance between to points
 * @param {object} pointA - First Point in Degrees
 * @param {object} pointB - Second Point in Degrees
 * @returns {number} Distance in km
 */

export const calDistance = (pointA, pointB) => {
  const radius = 6371; //Radius in km

  //Convert Latitude and Longitude from degrees to radians

  pointA.lat = (pointA.lat / 180) * Math.PI;
  pointA.lng = (pointA.lng / 180) * Math.PI;

  pointB.lat = (pointB.lat / 180) * Math.PI;
  pointB.lng = (pointB.lng / 180) * Math.PI;

  // Breaking formula into parts

  //let x = sin²(Δφ/2)
  const x = Math.pow(Math.sin((pointB.lat - pointA.lat) / 2), 2);
  //let y = sin²(Δλ/2)
  const y = Math.pow(Math.sin((pointB.lng - pointA.lng) / 2), 2);

  const a = x + Math.cos(pointA.lat) * Math.cos(pointB.lat) * y;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = c * radius;

  return distance.toFixed(2);
};
