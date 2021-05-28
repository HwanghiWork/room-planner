import React, { useState, useRef, useEffect } from "react";
import Imagebar from "Imagebar";
import {
  Stage,
  Layer,
  Image,
  Transformer,
  Rect,
} from "react-konva";
import useImage from "use-image";
import RoomSize from "RoomSize";

const URLImage = ({
  image,
  index,
  isSelected,
  onSelect,
  offSelect,
  onChange,
  canvasImages,
}) => {
  const [roomImg] = useImage(image.src);
  const [pinImg] = useImage("images/pin.png");
  const [pin, setPin] = useState(false);
  const imgRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (!pin && isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const togglePin = () => {
    if(!pin) // pin is activated
      offSelect();
    setPin(!pin);
  };
  
  // set size of LocalStorage
  if (canvasImages[index].width > 0 && roomImg) {
    roomImg.width = canvasImages[index].width;
    roomImg.height = canvasImages[index].height;
  }
  return (
    <React.Fragment>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={imgRef}
        image={roomImg}
        x={image.x}
        y={image.y}
        draggable={!pin}
        // I will use offset to set origin to the center of the image
        offsetX={roomImg ? roomImg.width / 2 : 0}
        offsetY={roomImg ? roomImg.height / 2 : 0}
        onDragEnd={(e) => {
          const {
            attrs: { x, y },
          } = e.target;
          onChange(e, {
            x: x,
            y: y,
            width: roomImg.width,
            height: roomImg.height,
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
      <Image
        onClick={togglePin}
        onTap={togglePin}
        image={pinImg}
        x={image.x}
        y={image.y}
        // offset to set origin to the corner of the image
        offsetX={roomImg ? -roomImg.width / 2 : 0}
        offsetY={pinImg ? pinImg.height : 0}
        opacity={pin ? 1 : 0.5}
      />
    </React.Fragment>
  );
};

const Room = () => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const didMount = useRef(false);
  /* Canvas Image Part */
  const [canvasImages, setCanvasImages] = useState(
    JSON.parse(localStorage.getItem("canvasImages")) || []
  );
  // Select a image when location changed
  let currentImage = 0;

  const [rects, setRects] = useState([]);
  const [rect, setRect] = useState({ x: 0, y: 0 });
  const [selectedId, selectShape] = useState(null);
  // this is a tricky way for calling useEffect
  const [cnt, setCount] = useState(0);
  // this is a trigger for modal
  const [show, setShow] = useState(false);
  // this is a ruler for setting room size
  const rulerSize = localStorage.getItem("rulerSize");
  const [size, setSize] = useState(
    rulerSize ? rulerSize : "0"
  );

  let colorIndex = 0;
  const rainbow = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "navy",
    "purple",
  ];

  // Add event listener
  function createRect(e) {
    e.preventDefault();
    let tmp = rect;
    tmp[e.target.name] = e.target.value;
    setRect(tmp);
  }

  function addRect(e) {
    e.preventDefault();
    let tmp = rect;
    if (canvasImages) {
      rect.x = canvasImages[currentImage].x;
      rect.y = canvasImages[currentImage].y;
      const setRect = { ...rect };
      setRects(rects.concat([setRect]));
    }
  }
  
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
    if (didMount.current) {
      setShow(true);
    } else {
      didMount.current = true;
    }
    localStorage.setItem(
      "canvasImages",
      JSON.stringify(canvasImages)
    );
  }, [canvasImages]);

  useEffect(() => {
    localStorage.setItem("rulerSize", size);
  }, [size]);

  return (
    <>
      <RoomSize
        show={show}
        setShow={setShow}
        setSize={setSize}
      />
      <div id={"buttons-wrapper"}>
        <button id="canvasImages" onClick={clearBoard}>
          Clear Image
        </button>
        <form onSubmit={addRect}>
          width:
          <input
            name="width"
            type="text"
            onChange={createRect}
          />
          height:
          <input
            name="height"
            type="text"
            onChange={createRect}
          />
          <input type="submit" value="Submit" />
        </form>
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
                width: 0,
                height: 0,
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
                <URLImage
                  key={i}
                  image={image}
                  index={i}
                  isSelected={i === selectedId}
                  onSelect={() => {
                    selectShape(i);
                  }}
                  offSelect={() => {
                    selectShape(null);
                  }}
                  onChange={(e, params) => {
                    const { x, y, width, height } = params;
                    currentImage = i;
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
            {rects ? (
              rects.map((rect, i) => {
                return (
                  <Rect
                    key={"rect" + i}
                    x={rect.x}
                    y={rect.y}
                    width={parseInt(rect.width)}
                    height={parseInt(rect.height)}
                    opacity={0.6}
                    fill={rainbow[colorIndex++ % 7]}
                    draggable
                    
                  />
                );
              })
            ) : (
              <Rect width={0} height={0} />
            )}
            <Rect
              x={ (window.innerWidth - parseInt(rulerSize)) / 2 }
              y={50}
              width={parseInt(rulerSize)}
              height={8}
              fill="red"
              opacity={0.4}
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Room;
