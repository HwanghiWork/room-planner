/* eslint-disable */
import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import {
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Data from "./data.js";
import Room from "./Room.js";

// check current window size
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Home = () => {
  let [가구, 가구변경] = useState(Data);
  let [가구가로, 가구가로변경] = useState();
  let [가구세로, 가구세로변경] = useState();
  const [width, height] = useWindowSize();
  function changeSidebar() {
    console.log("change!");
  }
  let [checked, setChecked] = useState(false);

  return (
    <div className="container-fluid px-5">
      <div className="row d-flex">
        <div className="col-8 " className="도면" >
          <Room width={width / 1.5} height={height / 1.5} />
        </div>

        <div className="col-4" className="가구추천" onChange={changeSidebar}>
          <h4>가구 추천</h4>
          <hr />
          <div className="row" className="가구추천스크롤">
            {가구.map((a, i) => {
              return (
                <Furniture
                  가구={가구[i]}
                  가구가로={가구가로}
                  가구가로변경={가구가로변경}
                  가구세로={가구세로}
                  가구세로변경={가구세로변경}
                  checked={checked}
                  setChecked={setChecked}
                  i={i}
                  key={i}
                />
              );
            })}
          </div>
          <Button
            variant="info"
            className="가구추천추가"
            onClick={() => {
              console.log(가구가로);
              console.log(가구세로);
            }}
          >
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}

function Furniture(props, i) {
  return (
    <div className="가구">
      <img
        className="가구추천이미지"
        src={props.가구.imgurl}
        alt="copy url"
        width="100%"
      />
      <a href={props.가구.url} className="가구추천텍스트">
        {" "}
        {props.가구.title}{" "}
      </a>
      <p className="가구추천텍스트">
        {" "}
        {props.가구.content}{" "}
      </p>
      <p className="가구추천텍스트"> {props.가구.price} </p>
      <ButtonGroup toggle className="mb-2">
        <ToggleButton
          type="checkbox"
          variant="secondary"
          checked={props.checked}
          value="1"
          onChange={(e) =>
            props.setChecked(e.currentTarget.checked)
          }
          onClick={() => {
            props.가구가로변경(props.가구.width);
            props.가구세로변경(props.가구.height);
            // console.log(props.가구.width);
            // console.log(props.가구.height);
          }}
        >
          선택
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
}

export default Home;
