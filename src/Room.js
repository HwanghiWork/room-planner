import React from 'react';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import room from './oneroom.jpg';

const BackgroundImage = () => {
  const [image] = useImage(room);
  return <Image image={image} draggable={true}/>;
};

const Room = (props) => {
  return(
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <BackgroundImage />
      </Layer>
    </Stage>
  );
}

export default Room;