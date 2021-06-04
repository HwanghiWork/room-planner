/* eslint-disable */
import React, {
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import "./App.css";
import {
  ButtonGroup,
  ToggleButton,
  Nav,
} from "react-bootstrap";
import Data from "data.js";
import Room from "Room.js";
import axios from "axios";

// check current window size
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () =>
      window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Home = () => {
  let [가구, 가구변경] = useState(Data);
  let [가구가로, 가구가로변경] = useState();
  let [가구세로, 가구세로변경] = useState();

  const category = ["bed", "closet", "desk", "drawer"];
  const menu = ["침대", "옷장", "책상", "서랍장"];
  let [가구종류, 가구종류변경] = useState(1); // 1 = 침대, 2 = 옷장, 3 = 책상, 4 = 서랍장

  let [currnetPage, setCurrentPage] = useState(1);

  function changePage(toPageNum) {
    const prevPage = currnetPage;
    const classNum = 가구종류;
    setCurrentPage(toPageNum);
    const baseUrl = "https://rudwl1005a.github.io/";
    axios
      .get(
        `${baseUrl}${category[classNum]}/${category[classNum]}data${toPageNum}.json`
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
    changePage(1);
  }, [가구종류]);
  return (
    <div className="container-fluid p-0 position-relative">
      <div className="d-flex flex-column">
        <Room />
      </div>
      <div className="가구추천 position-absolute">
        <Nav fill variant="tabs" defaultActiveKey="link-1">
          {menu.map((name, i) => {
            return (
              <Nav.Item>
                <Nav.Link
                  key={"menu" + i}
                  eventKey={"link-" + i}
                  onClick={(e) => {
                    가구종류변경(i);
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
                key={"funiture"+i}
                가구={funitureInfo}
                가구가로={가구가로}
                가구가로변경={가구가로변경}
                가구세로={가구세로}
                가구세로변경={가구세로변경}
                i={i}
                
              />
            );
          })}
        </div>
        <div className="page_wrap">
          <div className="page_nation">
            {[...Array(5)].map((n, i) => { // i는 0 부터 시작
              i += 1;
              return (
                <a
                  key={"page" + i}
                  href="#"
                  id={"page" + i}
                  onClick={() => {
                    changePage(i);
                  }}
                >
                  {i}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

function Furniture(props, i) {
  const {imgurl, url, title, content, price, width, height} = props.가구;
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
      <p className="가구추천텍스트">
        {content}
      </p>
      <p className="가구추천텍스트">
        {"가격 : " + price}
      </p>
      <p className="가구추천텍스트">
        {"크기 : " +
          width +
          " x " +
          height +
          " mm"}
      </p>
      <ButtonGroup toggle className="mb-2">
      <ToggleButton
          type="checkbox"
          variant="secondary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
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

export default Home;
