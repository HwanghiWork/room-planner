/* eslint-disable */
import React, { useState, useEffect } from 'react';
import 'App.css';
import {
  ButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import {refreshBoard} from 'Room';

const category = ['bed', 'closet', 'desk', 'drawer'];
const menu = ['침대', '옷장', '책상', '서랍장'];

const FurnitureList = (props) => {
  const [windowWidth, windowHeight] = props.size;
  let [가구, 가구변경] = useState([]);
  const [가구종류, 가구종류변경] = useState(category[0]); // 0 = 침대, 1 = 옷장, 2 = 책상, 3 = 서랍장
  const [pages, setPages] = useState([]);
  const [checkButtons, setCheckButtons] = useState(JSON.parse(localStorage.getItem('checkButtons')) || []);

  function changePage(toPageNum) {
    let tmpPages = [...Array(5)].fill(false);
    tmpPages[toPageNum] = true;
    setPages(tmpPages);

    const categoryName = 가구종류;
    const baseUrl = 'https://rudwl1005a.github.io/';
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
        console.log('실패');
      });
  }

  useEffect(() => {
    가구종류변경('bed');
  }, []);

  useEffect(() => {
    changePage(0);
  }, [가구종류]);

  useEffect(() => {
    localStorage.setItem(
      'checkButtons',
      JSON.stringify(checkButtons)
    );
  }, [checkButtons]);

  return (
    <div
      className='가구추천'
      style={{
        width: '20%',
        minWidth: '200px',
        height: windowHeight + 'px',
      }}
    >
      <Nav fill variant='tabs' defaultActiveKey='link-1'>
        {menu.map((name, i) => {
          return (
            <Nav.Item key={'category' + i}>
              <Nav.Link
                eventKey={'link-' + i}
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
      <div className='가구추천스크롤'>
        {가구.map((furnitureInfo, i) => {
          return (
            <Furniture
              key={'f' + i}
              id={'f' + i}
              가구={furnitureInfo}
              checkButtons={checkButtons}
              setCheckButtons={setCheckButtons}
            />
          );
        })}
      </div>
      <div className='page_wrap d-flex flex-column'
        style={{"background-color":"white"}}>
        <button onClick={refreshBoard}>
        선택한 가구 추가하기
        </button>
        <div className='page_nation'>
          {[...Array(5)].map((n, i) => {
            return (
              <a
                key={'page' + i}
                className={pages[i] ? 'active' : ''}
                id={'page' + i}
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
      imgurl, url, title, content, price, width, height,
    },
    id,
    checkButtons,
    setCheckButtons,
  } = props;

  const [checked, setChecked] = useState(checkButtons.find(fid => fid === id ? true : false));
  const rect = {
    id: -1,
    name: "",
    x: 100,
    y: 100,
    dx: 0,
    dy: 0,
    width: 0,
    height: 0,
    rotation:0,
    group: 0,
  };

  return (
    <div className='가구'>
      <img
        className='가구추천이미지'
        src={imgurl}
        alt='copy url'
        width='100%'
      />
      <a href={url} className='가구추천텍스트'>
        {title}
      </a>
      <p className='가구추천텍스트'>{content}</p>
      <p className='가구추천텍스트'>{'가격 : ' + price}</p>
      <p className='가구추천텍스트'>
        {'크기 : ' + width + ' x ' + height + ' mm'}
      </p>
      <ButtonGroup toggle className='mb-2'>
        <ToggleButton
          key={'b' + id}
          type='checkbox'
          variant='secondary'
          style={ {'opacity': !checked ? '0.6' : '1'}}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            const rects = JSON.parse(localStorage.getItem('furnitures'));
            if (e.target.checked) {
              let lastRect =
                rects.length > 0
                  ? rects[rects.length - 1]
                  : rect;
              let newRect = {
                ...lastRect,
                id: lastRect.id + 1,
                name: title,
                width: width,
                height: height,
              };
              localStorage.setItem(
                'furnitures',
                JSON.stringify(rects.concat(newRect))
              );
              setCheckButtons(checkButtons.concat([id]));
            } else {
              setCheckButtons(
                checkButtons.filter((fid) => {
                  return fid !== id;
              }));
              localStorage.setItem(
                'furnitures',
                JSON.stringify(rects.filter((rid) => {
                  return id !== 'f' + rid;
                }))
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
