/* eslint-disable */
import React, {
  useLayoutEffect,
  useState,
} from 'react';
import './App.css';

import Room from 'Room.js';
import FurnitureList from 'FurnitureList.js';

const Home = () => {
  return (
    <div className='container-fluid d-flex p-0'>
      <div className='d-flex flex-column'>
        <Room size={useWindowSize()} />
      </div>
      <FurnitureList size={useWindowSize()}/>
    </div>
  );
};

// Event listener when window size is resized
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () =>
      window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default Home;
