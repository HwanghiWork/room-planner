import React, { useState, useRef, useEffect } from "react";
import Imagebar from "Imagebar";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image, index, isSelected, onSelect, onChange}) => {
  const [img] = useImage(image.src);
  const [imgLoc, setImgLoc] = useState({x:0, y:0});
  const imgRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    // Update canvas
    let canvasImages = JSON.parse(
      localStorage.getItem("canvasImages")
    );
    if(canvasImages) {
      let change = canvasImages[index];
      change.x = imgLoc.x;
      change.y = imgLoc.y;
      localStorage.setItem(
        "canvasImages",
        JSON.stringify(canvasImages)
      );
    }
    
  });

  return (
    <React.Fragment>
      <Image
      onClick={onSelect}
      onTap={onSelect}
      ref={imgRef}
      image={img}
      x={image.x}
      y={image.y}
      draggable
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      onDragEnd={(e) => {
        const {
          attrs: { x, y },
        } = e.target;
        setImgLoc({x, y});
      }}
      onTransformEnd={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = imgRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          img,
          x: node.x(),
          y: node.y(),
          // set minimal value
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY),
        });
      }}
    />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
    
  );
};

const Room = () => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const [canvasImages, setCanvasImages] = useState(
    JSON.parse(localStorage.getItem("canvasImages")) || []
  );
  const [selectedId, selectShape] = useState(null);
  
  // Event Listener
  function clearBoard(e) {
    const { target:{id} } = e;
    localStorage.removeItem(id);
    window.location.reload();
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "canvasImages",
      JSON.stringify(canvasImages)
    );
  },[canvasImages]);

  return (
    <>
      <div id={"buttons-wrapper"}>
        <button id="canvasImages" onClick={clearBoard}>Clear</button>
      </div>
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
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {canvasImages.map((image, i) => {
              return (
                <URLImage key={i} image={image} index={i} />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Room;
