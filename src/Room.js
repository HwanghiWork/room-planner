import React, { useState, useRef } from "react";
import Imagebar from "Imagebar";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from "use-image";
import ImageUploading from "react-images-uploading";

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
      onDragEnd={(e) => {}}
    />
  );
};

const Room = () => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const [ruler, setRuler] = useState({
    w: 0,
    h: 0,
    x: 0,
    y: 0,
  });
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    let tmpRuler = ruler;
    const num = parseInt(value);
    switch (name) {
      case "width": tmpRuler.w = num; break;
      case "height": tmpRuler.h = num; break;
      case "offsetX": tmpRuler.x = num; break;
      case "offsetY": tmpRuler.y = num; break;
    }
    setRuler(tmpRuler);
    console.log(ruler)
  };
  return (
    <>
      {/* <div className="d-flex">
        <input name="width" type="number" onChange={onChange}/>
        <input name="height" type="number" onChange={onChange}/>
        <input name="offsetX" type="number" onChange={onChange}/>
        <input name="offsetY" type="number" onChange={onChange}/>
      </div> */}
      <Imagebar dragUrl={dragUrl} />
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
            <Rect
              x={ruler.x}
              y={ruler.y}
              width={ruler.w}
              height={ruler.h}
              stroke="black"
              style={{ border: "3px solid" }}
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Room;
