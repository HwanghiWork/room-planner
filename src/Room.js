import React from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const Room = (props) => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  return (
    <>
      <img
        alt="room"
        src="/images/oneroom.jpg"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
        {images.map((image) => {
              return <URLImage image={image} />;
        })}
        </Layer>
      </Stage>
    </>
  );
};

export default Room;
