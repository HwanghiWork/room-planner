import React from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from "use-image";

let fileList = ["room1", "room2"];
const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      draggable
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const Imagebar = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  return (
    <>
      <div className="d-flex">
        {fileList.map((file, i) => 
            <img
              key={file.toString()}
              alt={file}
              src={"/images/" + file + ".jpg"}
              width={100}
              height={100}
              margin={10}
              draggable="true"
              onDragStart={(e) => {
                dragUrl.current = e.target.src;
              }}
            />
        )}
      </div>
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: "1px solid grey" }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image, i) => {
              return <URLImage key={i} image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Imagebar;
