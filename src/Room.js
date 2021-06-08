import React, { useState, useRef, useEffect } from 'react';
import Imagebar from 'Imagebar';
import {
  Stage,
  Layer,
  Image,
  Transformer,
  Rect,
} from 'react-konva';
import useImage from 'use-image';
import RoomScale from 'RoomScale';

const URLImage = ({
  image,
  isSelected,
  onSelect,
  offSelect,
  onChange,
  room,
  rulerWidth,
}) => {
  const [roomImg] = useImage(image.src);
  const [pinImg] = useImage('images/pin.png');
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
    if (!pin) offSelect();
    setPin(!pin);
  };

  // set size of LocalStorage
  if (room.width > 0 && roomImg) {
    roomImg.width = room.width;
    roomImg.height = room.height;
  } else if (roomImg) {
    // set Default
    let initialScale = rulerWidth / roomImg.width;
    roomImg.width = roomImg.width * initialScale;
    roomImg.height = roomImg.height * initialScale;
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
        // Use offset to set origin to the center of the image
        offsetX={roomImg ? roomImg.width / 2 : 0}
        offsetY={roomImg ? roomImg.height / 2 : 0}
        onDragEnd={(e) => {
          const {
            attrs: { x, y },
          } = e.target;
          onChange('dragend', {
            x: x,
            y: y,
            width: roomImg.width,
            height: roomImg.height,
            src: room.src,
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const {
            attrs: { x, y },
          } = e.target;
          const node = imgRef.current;
          onChange('transformend', {
            x: x,
            y: y,
            width: Math.max(
              5,
              roomImg.width * node.scaleX()
            ),
            height: Math.max(
              5,
              roomImg.height * node.scaleY()
            ),
            src: room.src,
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
            if (newBox.width < 5 || newBox.height < 5)
              return oldBox;
            else return newBox;
          }}
        />
      )}
      <Image
        onClick={togglePin}
        onTap={togglePin}
        image={pinImg}
        x={image.x}
        y={image.y}
        offsetX={roomImg ? -roomImg.width / 2.8 : 0}
        offsetY={roomImg ? roomImg.height / 2.2 : 0}
        opacity={pin ? 1 : 0.5}
      />
    </React.Fragment>
  );
};

const Room = (props) => {
  const dragUrl = useRef();
  const stageRef = useRef();
  /* Rooms Part */
  const [rooms, setRooms] = useState(
    JSON.parse(localStorage.getItem('rooms')) || []
  );
  const [currentRoom, setCurrentRoom] = useState(0);
  /* furnitures Part */
  const [rects, setRects] = useState(JSON.parse(localStorage.getItem('furnitures')) || []);
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

  // this is a scale that (window's width) / (actually room's width)
  const [scale, setScale] = useState(1);
  const [rulerWidth, setRulerWidth] = useState(
    window.innerWidth * 0.6
  );

  let colorIndex = 0;
  const rainbow = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'navy',
    'purple',
  ];

  // Add event listener
  function typeRect(e) {
    e.preventDefault();
    let tmp = rect;
    tmp[e.target.name] = e.target.value;
    setRect(tmp);
  }

  const addRect = (e) => {
    e.preventDefault();
    if (rooms) {
      rect.x = rooms[currentRoom].x;
      rect.y = rooms[currentRoom].y;
      rect.group = currentRoom;
      rect.id =
        rects.length > 0
          ? rects[rects.length - 1].id + 1
          : 0;
      setRects(rects.concat(rect));
    }
  };

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
    switch (id) {
      case 'rooms':
        setRooms([]);
        break;
      case 'furnitures':
        setRects([]);
        localStorage.setItem('checkButtons', JSON.stringify([]));
        window.location.reload();
        break;
    }
  }

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  useEffect(() => {
    const localScale = JSON.parse(
      localStorage.getItem('scale')
    );
    if (localScale) 
      setScale(localScale)
    else
      setScale(1);
  }, []);

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(
      'furnitures',
      JSON.stringify(rects)
    );
  }, [rects]);

  useEffect(() => {
    localStorage.setItem('scale', JSON.stringify(scale));
  }, [scale]);
  return (
    <>
      <div
        className='d-flex flex-column'
        id={'buttons-wrapper'}
      >
        <div className='d-flex'>
          <RoomScale
            scale={scale}
            setScale={setScale}
            rulerWidth={rulerWidth}
          />
          <button id='rooms' onClick={clearBoard}>
            Clear Image
          </button>
          <button id='furnitures' onClick={clearBoard}>
            Clear Rects
          </button>
        </div>
        <div className='d-flex'>
          <form onSubmit={addRect}>
            가로:
            <input
              name='width'
              type='text'
              onChange={typeRect}
            />
            <span className='mx-3' />
            세로:
            <input
              name='height'
              type='text'
              onChange={typeRect}
            />
            <input type='submit' value='가구 추가' />
          </form>
        </div>
      </div>
      <Imagebar dragUrl={dragUrl} />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setRooms(
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
          width={props.size[0] - 200}
          height={props.size[1]}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {rooms.map((image, roomId) => {
              return (
                <URLImage
                  key={roomId}
                  image={image}
                  isSelected={selectedId === roomId}
                  onSelect={() => {
                    setCurrentRoom(roomId);
                    selectShape(roomId);
                  }}
                  offSelect={() => {
                    selectShape(null);
                  }}
                  onChange={(event, params) => {
                    const { x, y } = params;
                    setCurrentRoom(roomId);
                    switch (event) {
                      case 'dragend':
                        rooms[roomId].x = x;
                        rooms[roomId].y = y;
                        break;
                      case 'transformend':
                        rooms[roomId] = { ...params };
                        break;
                    }
                    setRooms(rooms.concat([]));

                    if (rects) {
                      for (
                        let i = 0;
                        i < rects.length;
                        i++
                      ) {
                        if (roomId === rects[i].group) {
                          rects[i].x = x;
                          rects[i].y = y;
                        }
                      }
                      setRects(rects.concat([]));
                    }
                  }}
                  room={rooms[roomId]}
                  rulerWidth={rulerWidth}
                />
              );
            })}
            {rects &&
              rects.map((item, i) => {
                return (
                  <Rect
                    key={'rect' + item.id}
                    x={item.x + item.offsetX}
                    y={item.y + item.offsetY}
                    width={parseInt(item.width) * scale}
                    height={parseInt(item.height) * scale}
                    opacity={0.6}
                    fill={rainbow[colorIndex++ % 7]}
                    draggable
                    onDragEnd={(e) => moveRect(e, item.id)}
                  />
                );
              })}
            <Rect
              x={window.innerWidth * 0.1}
              y={50}
              width={rulerWidth}
              height={8}
              fill='red'
              opacity={0.4}
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
export function refreshBoard() {
  window.location.reload();
}
export default Room;
