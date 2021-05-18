/* eslint-disable */

import React, { useState } from 'react';
import useInfiniteScroll from "./useInfiniteScroll";
import Data from './data.js';

const List = () => {
  const [listItems, setListItems] = useState(Array.from(Array(3).keys(), n => n + 1));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  let [가구1, 가구변경1] = useState(Data);

  function fetchMoreListItems() {
    setTimeout(() => {
      setListItems(prevState => ([...prevState, ...Array.from(Array(3).keys(), n => n + prevState.length + 1)]));
      setIsFetching(false);
    }, 2000);
  }

  return (
    <>
      <ul className="list-group mb-2">
        {/*listItems.map(listItem => <li className="list-group-item">List Item {listItem}</li>)*/}
        {/*가구1.map((a, i) => {
          return (
            <Furniture 가구1={가구1[i]}
              i={i} key={i} />
          );
        })*/}
      </ul>
      {isFetching && 'Fetching more list items...'}
    </>
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
      <a href={props.가구1.url} className="가구추천텍스트"> {props.가구1.title} </a>
      <p className="가구추천텍스트"> {props.가구1.content} </p>
      <p className="가구추천텍스트"> {props.가구1.price} </p>
    </div>
  );
};

export default List;