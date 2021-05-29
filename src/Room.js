/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";
import Imagebar from "Imagebar";
import {
  Stage,
  Layer,
  Image,
  Transformer,
} from "react-konva";
import {
  Button,
  ButtonGroup,
} from "react-bootstrap";
import useImage from "use-image";

const URLImage = ({
  image,
  index,
  isSelected,
  onSelect,
  onChange,
  canvasImages,
}) => {
  const [img] = useImage(image.src);
  if (canvasImages[index].width > 0 && img) {
    img.width = canvasImages[index].width;
    img.height = canvasImages[index].height;
  }
  const imgRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

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
          onChange(e, {
            x: x,
            y: y,
            width: img.width,
            height: img.height,
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = imgRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          onChange(e, {
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.width() * scaleY),
          });
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
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

const Room = (props) => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const [canvasImages, setCanvasImages] = useState(
    JSON.parse(localStorage.getItem("canvasImages")) || []
  );
  const [selectedId, selectShape] = useState(null);
  // this is a tricky way for calling useEffect
  const [cnt, setCount] = useState(0);

  // button click event listener
  function clearBoard(e) {
    const {
      target: { id },
    } = e;
    localStorage.removeItem(id);
    window.location.reload();
  }

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      setCount(0);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "canvasImages",
      JSON.stringify(canvasImages)
    );
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
                width: 0,
                height: 0,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={props.width}
          height={props.height}
          style={{ border: "1px solid grey" }}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {canvasImages.map((image, i) => {
              return (
                <URLImage
                  key={i}
                  image={image}
                  index={i}
                  isSelected={i === selectedId}
                  onSelect={() => {
                    selectShape(i);
                  }}
                  onChange={(e, params) => {
                    const { x, y, width, height } = params;
                    canvasImages[i].x = x;
                    canvasImages[i].y = y;
                    canvasImages[i].width = width;
                    canvasImages[i].height = height;
                    setCanvasImages(canvasImages);
                    localStorage.setItem(
                      "canvasImages",
                      JSON.stringify(canvasImages)
                    );
                    setCount(cnt + 1);
                  }}
                  canvasImages={canvasImages}
                />
              );
            })}
          </Layer>
        </Stage>
        <div id="buttons-wrapper" className={"pt-3"}>
          <Button id="canvasImages" onClick={clearBoard}>
            Clear
          </Button>
        </div>
      </div>
    </>
  );
};

export default Room;
