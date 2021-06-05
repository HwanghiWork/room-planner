/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./App.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Data from "data.js";
import axios from "axios";

const category = ["bed", "closet", "desk", "drawer"];
const menu = ["침대", "옷장", "책상", "서랍장"];

const FurnitureList = (props) => {
  const [ windowWidth, windowHeight ] = props.size;
  let [가구, 가구변경] = useState(Data);
  let [가구가로, 가구가로변경] = useState();
  let [가구세로, 가구세로변경] = useState();
  const [가구종류, 가구종류변경] = useState(category[0]); // 0 = 침대, 1 = 옷장, 2 = 책상, 3 = 서랍장
  const [pages, setPages] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  function changePage(toPageNum) {
    let tmpPages = [false, false, false, false, false];
    tmpPages[toPageNum] = true;
    setPages(tmpPages);

    const categoryName = 가구종류;
    const baseUrl = "https://rudwl1005a.github.io/";
    axios
      .get(
        `${baseUrl}${categoryName}/${categoryName}data${
          toPageNum + 1
        }.json`
      )
      .then((result) => {
        가구변경([...result.data]);
      })
      .catch(() => {
        console.log("실패");
      });
  }

  useEffect(() => {
    axios
      .get("https://rudwl1005a.github.io/bed/beddata1.json")
      .then((result) => {
        가구변경([...result.data]);
      })
      .catch(() => {
        console.log("실패");
      });
  }, []);

  useEffect(() => {
    changePage(0);
  }, [가구종류]);
  return (
    <div
      className="가구추천"
      style={{
        "width": "20%",
        "minWidth": "200px",
        "height": (windowHeight - 250) + "px"
      }}
    >
      <Nav fill variant="tabs" defaultActiveKey="link-1">
        {menu.map((name, i) => {
          return (
            <Nav.Item>
              <Nav.Link
                key={"category" + i}
                eventKey={"link-" + i}
                onClick={(e) => {
                  가구종류변경(category[i]);
                }}
              >
                {name}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <div className="가구추천스크롤">
        {가구.map((funitureInfo, i) => {
          return (
            <Furniture
              key={"funiture" + i}
              가구={funitureInfo}
              가구가로={가구가로}
              가구가로변경={가구가로변경}
              가구세로={가구세로}
              가구세로변경={가구세로변경}
            />
          );
        })}
      </div>
      <div className="page_wrap">
        <div className="page_nation">
          {[...Array(5)].map((n, i) => {
            return (
              <a
                key={"page" + i}
                className={pages[i] ? "active" : ""}
                id={"page" + i}
                onClick={() => {
                  changePage(i);
                }}
              >
                {i + 1}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function Furniture(props) {
  const {
    imgurl,
    url,
    title,
    content,
    price,
    width,
    height,
  } = props.가구;
  const [checked, setChecked] = useState(false);

  return (
    <div className="가구">
      <img
        className="가구추천이미지"
        src={imgurl}
        alt="copy url"
        width="100%"
      />
      <a href={url} className="가구추천텍스트">
        {title}
      </a>
      <p className="가구추천텍스트">{content}</p>
      <p className="가구추천텍스트">{"가격 : " + price}</p>
      <p className="가구추천텍스트">
        {"크기 : " + width + " x " + height + " mm"}
      </p>
      <ButtonGroup toggle className="mb-2">
        <ToggleButton
          type="checkbox"
          variant="secondary"
          checked={checked}
          value="1"
          onChange={(e) =>
            setChecked(e.currentTarget.checked)
          }
          onClick={(e) => {
            props.가구가로변경(width);
            props.가구세로변경(height);
          }}
        >
          추가
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
}

export default FurnitureList;
