import React, { useState, useRef } from "react";
import Imagebar from "Imagebar";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image, index }) => {
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
      onDragEnd={(e) => {
        const { attrs:{x, y} } = e.target;
        let canvasImages = JSON.parse(localStorage.getItem("canvasImages"));
        // Search this image and change values
        canvasImages[index].x = x;
        canvasImages[index].y = y;
        localStorage.setItem("canvasImages", JSON.stringify(canvasImages));
      }}
    />
  );
};

const Room = () => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const [canvasImages, setCanvasImages] = useState(
    JSON.parse(localStorage.getItem("canvasImages")) || []
  );
  
  React.useEffect(() => {
    localStorage.setItem("canvasImages", JSON.stringify(canvasImages));
    console.log(JSON.parse(localStorage.getItem("canvasImages")))
  }, [canvasImages]);

  return (
    <>
      <Imagebar dragUrl={dragUrl} />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setCanvasImages(
            canvasImages.concat([
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
            {canvasImages.map((image, i) => {
              return <URLImage key={i} image={image} index={i}/>;
            })}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Room;
