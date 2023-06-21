import { useState } from 'react';

const InputForm = () => {
  const [location, setLocation] = useState('');

  const [distance, setDistance] = useState(null);

  const { inputA, inputB } = location;

  class Coordinate {
    constructor(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    }
  }

  const inputToCoordinate = (input) => {
    let temp = input.split(',');
    if (temp.length === 2) {
      return new Coordinate(temp[0], temp[1]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let pointA = inputToCoordinate(location.inputA);
    let pointB = inputToCoordinate(location.inputB);
    calDistance(pointA, pointB);
  };
  /**
   *
   * Haversine
   * formula:	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
   * c = 2 ⋅ atan2( √a, √(1−a) )
   * d = R ⋅ c
   * R = Earth Radius
   * φ is latitude, λ is longitude, R is earth’s radius (mean radius = * 6,371km);
   * note that angles need to be in radians to pass to trig functions!
   */
  const calDistance = (pointA, pointB) => {
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

    setDistance(distance.toFixed(2));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Cords for Point A</label>
          <br />
          <input name='inputA' value={inputA || ''} onChange={handleChange} />
          <br />
        </div>
        <div>
          <label>Enter Cords for Point B</label>
          <br />
          <input name='inputB' value={inputB || ''} onChange={handleChange} />
          <br />
        </div>
        <div>
          <button type='submit'>Calculate</button>
        </div>
      </form>

      {!isNaN(distance) && (
        <p>The distance between Point A and Point B is {distance} km</p>
      )}
    </div>
  );
};

export default InputForm;
