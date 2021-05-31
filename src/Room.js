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
  rooms,
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
  }, [pin, isSelected]);

  const togglePin = () => {
    if (!pin)
      offSelect();
    setPin(!pin);
  };

  // set size of LocalStorage
  if (rooms[index].width > 0 && roomImg) {
    roomImg.width = rooms[index].width;
    roomImg.height = rooms[index].height;
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
            height: Math.max(5, node.height() * scaleY),
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
        offsetX={roomImg ? -roomImg.width / 3 : 0}
        offsetY={roomImg ? roomImg.height / 2 : 0}
        opacity={pin ? 1 : 0.5}
      />
    </React.Fragment>
  );
};

const Room = () => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const didMount = useRef(false);
  /* Rooms Part */
  const [rooms, setrooms] = useState(
    JSON.parse(localStorage.getItem("rooms")) || []
  );
  const [currentRoom, setCurrentRoom] = useState(0);
  /* Funitures Part */
  const [rects, setRects] = useState(
    JSON.parse(localStorage.getItem("funitures")) || []
  );
  const [rect, setRect] = useState({
    id: 0,
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
    group: 0,
  });
  const [selectedId, selectShape] = useState(null);
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
  function moveRoom(e, params) {
    const { x, y, width, height } = params;
    rooms[currentRoom].x = x;
    rooms[currentRoom].y = y;
    rooms[currentRoom].width = width;
    rooms[currentRoom].height = height;
    setrooms(rooms);
    // Move rects together
    for(let i=0; i < rects.length; i++) {
      if(rects[i].group === currentRoom) {
        rects[i].x = x;
        rects[i].y = y;
      }
    }
    setRects(rects.concat([]));
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }

  function createRect(e) {
    e.preventDefault();
    let tmp = rect;
    tmp[e.target.name] = e.target.value;
    setRect(tmp);
  }

  function addRect(e) {
    e.preventDefault();
    if (rooms) {
      rect.x = rooms[currentRoom].x;
      rect.y = rooms[currentRoom].y;
      rect.group = currentRoom;
      rect.id = rects.length;
      setRects(rects.concat([{ ...rect }]));
    }
  }

  function moveRect(e, i) {
    const { x, y } = e.target.attrs;
    rects[i].offsetX = x - rects[i].x;
    rects[i].offsetY = y - rects[i].y;
    setRects(rects.concat([]));
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
    }
  };

  useEffect(() => {
    if (didMount.current) {
      setShow(true);
      setCurrentRoom(rooms.length - 1);
      localStorage.setItem("rooms", JSON.stringify(rooms));
    } else {
      didMount.current = true;
    }
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("rulerSize", size);
  }, [size]);

  useEffect(() => {
    localStorage.setItem(
      "funitures",
      JSON.stringify(rects)
    );
  }, [rects]);

  return (
    <>
      <RoomSize
        show={show}
        setShow={setShow}
        setSize={setSize}
      />
      <div id={"buttons-wrapper"} >
        <button id="rooms" onClick={clearBoard}>
          Clear Image
        </button>
        <button id="funitures" onClick={clearBoard}>
          Clear Rects
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
          setrooms(
            rooms.concat([
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
            {rooms.map((image, i) => {
              return (
                <URLImage
                  key={i}
                  image={image}
                  index={i}
                  isSelected={i === selectedId}
                  onSelect={() => {
                    setCurrentRoom(i);
                    selectShape(i);
                  }}
                  offSelect={() => {
                    selectShape(null);
                  }}
                  onChange={(e, params) => {
                    moveRoom(e, params);
                  }}
                  rooms={rooms}
                />
              );
            })}
            {rects.map((rect, i) => {
              return (
                <Rect
                  key={"rect" + i}
                  x={rect.x + rect.offsetX}
                  y={rect.y + rect.offsetY}
                  width={parseInt(rect.width)}
                  height={parseInt(rect.height)}
                  opacity={0.6}
                  fill={rainbow[colorIndex++ % 7]}
                  draggable
                  onDragEnd={(e) => moveRect(e, rect.id)}
                />
              );
            })}
            <Rect
              x={window.innerWidth * 0.2}
              y={50}
              width={window.innerWidth * 0.6}
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
