/* eslint-disable */

import React, { useState } from "react";
import "./App.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Jumbotron,
} from "react-bootstrap";
import Data from "./data.js";
import Room from "./Room.js";
import { Link, Route, Switch } from 'react-router-dom';

function Home(){
    let [가구, 가구변경] = useState(Data);
    
    return(
        <div>
            <div className="container">
            <div className="row d-flex align-items-start">
                <div className="col-2" className="사용자도형">
                <h5>사용자 설정 도형</h5>
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
                    placeholder="가로(cm)"
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="세로(cm)"
                    />
                </div>
                <p>
                    {" "}
                    <Button variant="secondary">추가</Button>{" "}
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
                    placeholder="가로(cm)"
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="세로(cm)"
                    />
                </div>
                <p>
                    {" "}
                    <Button variant="secondary">추가</Button>{" "}
                </p>
                </div>
                <div className="col-7 d-flex flex-column ">
                <Room
                    className="text-center"
                    width={730}
                    height={window.innerHeight / 1.5}
                />
                <h1> My room </h1>
                <p>도면에 도형을 배치 할 수 있습니다.</p>
                <p>
                    <Button variant="primary">Interior</Button>
                </p>
                </div>
                <div className="col-2">
                <h4>가구 추천</h4>

                <div className="row">
                    {가구.map((a, i) => {
                    return (
                        <Furniture 가구={가구[i]} i={i} key={i} />
                    );
                    })}
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};


function Furniture(props, i) {
    return (
      <div>
        <img
          src={
            process.env.PUBLIC_URL +
            "침대" +
            (props.i + 1) +
            ".jpg"
          }
          alt="copy url"
          width="100%"
        />
        <p> {props.가구.title} </p>
        <p> {props.가구.content} </p>
        <p> {props.가구.price} </p>
      </div>
    );
  };

  export default Home;