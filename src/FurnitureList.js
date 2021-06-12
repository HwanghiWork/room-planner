/* eslint-disable */
import React, { useState, useEffect } from "react";
import "App.css";
import { ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import axios from "axios";

const category = ["bed", "closet", "desk", "drawer"];
const menu = ["침대", "옷장", "책상", "서랍장"];

const FurnitureList = (props) => {
  const [windowWidth, windowHeight] = props.size;
  const rect = props.rect;
  const rects = props.rects;
  const setRects = props.setRects;

  let [가구, 가구변경] = useState([]);
  const [가구종류, 가구종류변경] = useState(category[0]); // 0 = 침대, 1 = 옷장, 2 = 책상, 3 = 서랍장
  const [pageNum, setPageNum] = useState(0);
  const [checkButtons, setCheckButtons] = useState(
    JSON.parse(localStorage.getItem("checkButtons")) || []
  );

  function changePage(toPageNum) {
    setPageNum(toPageNum);

    const categoryName = 가구종류;
    const baseUrl = "https://rudwl1005a.github.io/";
    axios
      .get(
        `${baseUrl}${categoryName}/${categoryName}data${toPageNum + 1}.json`
      )
      .then((result) => {
        가구변경([...result.data]);
      })
      .catch(() => {
        console.log("실패");
      });
  }

  useEffect(() => {
    가구종류변경("bed");
  }, []);

  useEffect(() => {
    changePage(0);
  }, [가구종류]);

  useEffect(() => {
    localStorage.setItem(
      "checkButtons",
      JSON.stringify(checkButtons)
    );
  }, [checkButtons]);

  return (
    <div
      className="가구추천"
      style={{

        width: '20%',
        minWidth: '300px',
        height: windowHeight + 'px',
        marginTop: '35px'
      }}
    >
      <Nav fill variant="tabs" defaultActiveKey="link-0">
        {menu.map((name, i) => {
          return (
            <Nav.Item key={"category" + i}>
              <Nav.Link
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
        {가구.map((fInfo, i) => {
          return (
            <Furniture
              key={가구종류 + pageNum + i}
              id={i}
              가구={fInfo}
              category={가구종류}
              pageNum={pageNum}
              checkButtons={checkButtons}
              setCheckButtons={setCheckButtons}
              lastRect={
                rects.length > 0
                  ? rects[rects.length - 1]
                  : rect
              }
              rects={rects}
              setRects={setRects}
            />
          );
        })}
      </div>
      <div
        className="page_wrap d-flex flex-column"
        style={{
          backgroundColor: "white",
          zIndex: "100",
        }}
      >
        <div className="page_nation">
          {[...Array(5)].map((n, i) => {
            return (
              <a
                key={"page" + i}
                className={pageNum === i ? "active" : ""}
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

const Furniture = (props) => {
  const {
    가구: {
      imgurl,
      url,
      title,
      content,
      price,
      width,
      height,
    },
    id,
    category,
    pageNum,
    checkButtons,
    setCheckButtons,
    lastRect,
    rects,
    setRects
  } = props;
  const newRectId = parseInt(lastRect.id) + 1;
  const checkButtonId = category + pageNum + id;
  const [checked, setChecked] = useState(
    checkButtons.find((fid) =>
      fid === checkButtonId ? true : false
    )
  );
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
          key={checkButtonId}
          id ={checkButtonId}
          type="checkbox"
          variant="secondary"
          style={{ opacity: !checked ? "0.6" : "1" }}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              let newRect = {
                ...lastRect,
                id: newRectId,
                name: title,
                width: width,
                height: height,
                checkButtonId: checkButtonId,
              };
              setRects(rects.concat(newRect));
              localStorage.setItem(
                "furnitures",
                JSON.stringify(rects.concat(newRect))
              );
              setCheckButtons(
                checkButtons.concat([checkButtonId])
              );
            } else {
              setCheckButtons(
                checkButtons.filter((fid) => {
                  return fid !== checkButtonId;
                })
              );
              const newRects = rects.filter((rect) => {
                return (
                  checkButtonId !== rect.checkButtonId
                );
              });
              setRects(newRects);
              localStorage.setItem(
                "furnitures",
                JSON.stringify(newRects)
              );
            }
          }}
        >
          선택
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
};

export default FurnitureList;
