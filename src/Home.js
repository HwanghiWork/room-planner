/* eslint-disable */

import React, { useState } from "react";
import "./App.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Jumbotron,
  ButtonGroup,
  ToggleButton
} from "react-bootstrap";
import Data from "./data.js";
import Room from "./Room.js";
import { Link, Route, Switch } from 'react-router-dom';

function Home() {
  let [가구, 가구변경] = useState(Data);
  let [사각형가로, 사각형가로변경] = useState();
  let [사각형세로, 사각형세로변경] = useState();
  let [삼각형가로, 삼각형가로변경] = useState();
  let [삼각형세로, 삼각형세로변경] = useState();

  let [가구가로, 가구가로변경] = useState();
  let [가구세로, 가구세로변경] = useState();

  let [checked, setChecked] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="row d-flex align-items-start">
          <div className="col-2" className="사용자도형">
            <h5>사용자 설정</h5>
            <img
              src={process.env.PUBLIC_URL + "square.jpg"}
              alt="copy url"
              width="100%"
            />
            <p>사각형</p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="가로(mm)"
                onChange={(e) => { 사각형가로변경(e.target.value) }}
              />
              {사각형가로 /*지우기*/}
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="세로(mm)"
                onChange={(e) => { 사각형세로변경(e.target.value) }}
              />
              {사각형세로 /*지우기*/}
            </div>
            <p>
              <Button variant="info" onClick={() => {
                console.log(사각형가로);
                console.log(사각형세로);
              }}>추가</Button>
            </p>
            <img
              src={process.env.PUBLIC_URL + "triangle.jpg"}
              alt="copy url"
              width="100%"
            />
            <p>삼각형</p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="가로(mm)"
                onChange={(e) => { 삼각형가로변경(e.target.value) }}
              />
              {삼각형가로 /*지우기*/}
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="세로(mm)"
                onChange={(e) => { 삼각형세로변경(e.target.value) }}
              />
              {삼각형세로 /*지우기*/}
            </div>
            <p>
              <Button variant="info" onClick={() => {
                console.log(삼각형가로);
                console.log(삼각형세로);
              }}>추가</Button>
            </p>
          </div>
          <div className="col-7 d-flex flex-column " className="도면">
            <Room
              className="text-center"
              width={730}
              height={window.innerHeight / 1.5}
            />
            <h1> My room </h1>
            <p>도면에 도형을 배치 할 수 있습니다.</p>
            <p>
              <Button variant="info">Interior</Button>
            </p>
          </div>
          <div className="col-2" className="가구추천">
            <h4>가구 추천</h4>
            <div className="row" className="가구추천스크롤">
              {가구.map((a, i) => {
                return (
                  <Furniture 가구={가구[i]}
                    가구가로={가구가로} 가구가로변경={가구가로변경}
                    가구세로={가구세로} 가구세로변경={가구세로변경}
                    checked={checked} setChecked={setChecked}
                    i={i} key={i} />
                );
              })}
            </div>
            <Button variant="info" className="가구추천추가" onClick={() => {
              console.log(가구가로);
              console.log(가구세로);
            }
            }>추가</Button>
          </div>
        </div>
      </div>
    </div>
  );
};


function Furniture(props, i) {

  return (
    <div className="가구">
      <img className="가구추천이미지"
        src={process.env.PUBLIC_URL + "침대" + (props.i + 1) + ".jpg"}
        alt="copy url"
        width="100%"
      />
      <a href={props.가구.url} className="가구추천텍스트"> {props.가구.title} </a>
      <p className="가구추천텍스트"> {props.가구.content} </p>
      <p className="가구추천텍스트"> {props.가구.price} </p>
      <ButtonGroup toggle className="mb-2">
        <ToggleButton
          type="checkbox"
          variant="secondary"
          checked={props.checked}
          value="1"
          onChange={(e) => props.setChecked(e.currentTarget.checked)}
          onClick={
            () => {
              props.가구가로변경(props.가구.width);
              props.가구세로변경(props.가구.height);
              // console.log(props.가구.width);
              // console.log(props.가구.height);
            }
          }
        >
          선택
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
};

export default Home;