import React, { Component } from 'react';
import { Stage, Layer, Image, Circle, Rect } from 'react-konva';
import useImage from 'use-image';
import room from './room.png'

const BackgroundImage = () => {
  const [image] = useImage(room);
  return <Image image={image} draggable={true}/>;
};

const App = () => { 
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <BackgroundImage />
        <Circle x={200} y={100} radius={50} fill="green"  draggable={true}/>
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={2}
          draggable={true}
        />
      </Layer>
    </Stage>
  );
}

export default App;
