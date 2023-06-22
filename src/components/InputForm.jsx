import { useState } from 'react';

import { getCoordinatesFromAddress } from '../api/Google/Geocoding';
import { calDistance } from './Distance';

const InputForm = () => {
  const [location, setLocation] = useState('');
  const { inputA, inputB } = location;

  const [distance, setDistance] = useState(null);

  const [inputType, setInputType] = useState('coordinate');

  // Input Procecessing

  class Coordinate {
    constructor(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    }
  }

  // Process User entered Coordinates
  const inputToCoordinate = (input) => {
    let temp = input.split(',');
    if (temp.length === 2) {
      return new Coordinate(temp[0], temp[1]);
    } else {
      throw new Error('Invaild Input');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let pointA, pointB;
    if (inputType === 'coordinate') {
      pointA = inputToCoordinate(location.inputA);
      pointB = inputToCoordinate(location.inputB);
    } else {
      //Google Geocoding
      pointA = await getCoordinatesFromAddress(location.inputA);
      pointB = await getCoordinatesFromAddress(location.inputB);
    }
    setDistance(calDistance(pointA, pointB));
  };

  const handleInputType = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div onChange={handleInputType}>
          <input
            type='radio'
            value='coordinate'
            name='inputType'
            defaultChecked
          />
          Coor
          <input type='radio' value='address' name='inputType' /> Address
        </div>
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
      <div>
        {distance != null && (
          <p>The distance between Point A and Point B is {distance} km</p>
        )}
      </div>
    </div>
  );
};

export default InputForm;
