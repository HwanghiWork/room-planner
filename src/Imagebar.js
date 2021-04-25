import React from "react";

let fileList = ["room1", "room2"];

const Imagebar = (props) => {
  return (
    <div className="d-flex">
      {fileList.map((file, i) => (
        <img
          key={file.toString()}
          alt={file}
          src={"/images/" + file + ".jpg"}
          width={100}
          height={100}
          margin={10}
          draggable
          onDragStart={(e) => {
            props.dragUrl.current = e.target.src;
          }}
        />
      ))}
    </div>
  );
};

export default Imagebar;
