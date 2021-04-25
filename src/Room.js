/* eslint-disable */

import React from 'react';
import { Stage, Layer, Image, Circle, Rect } from 'react-konva';
import useImage from 'use-image';
import room from './oneroom.jpg';

const BackgroundImage = () => {
  const [image] = useImage(room);
  return <Image image={image} draggable={true} />;
};

const Room = (props) => {
  return (
    <Stage width={props.width} height={props.height}>
      <Layer>
        <BackgroundImage />
      </Layer>
    </Stage>
  );

}



export default Room;