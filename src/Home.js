/* eslint-disable */
import React, {
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import "./App.css";
import {
  Button,
  ButtonGroup,
  ToggleButton,
  Nav,
} from "react-bootstrap";
import Data from "./data.js";
import Room from "./Room.js";
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
  const [width, height] = useWindowSize();
  function changeSidebar() {
    console.log("change!");
  }
  let [checked, setChecked] = useState(false);
  let [가구종류, 가구종류변경] = useState(1); // 1 = 침대, 2 = 옷장, 3 = 책상, 4 = 서랍장

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

  function toggleClass(index) {
    if (index == 1) {
      document
        .getElementById("1")
        .classList.toggle("active");
    } else if (index == 2) {
      document
        .getElementById("2")
        .classList.toggle("active");
    } else if (index == 3) {
      document
        .getElementById("3")
        .classList.toggle("active");
    } else if (index == 4) {
      document
        .getElementById("4")
        .classList.toggle("active");
    } else if (index == 5) {
      document
        .getElementById("5")
        .classList.toggle("active");
    } else if (index == 6) {
      document
        .getElementById("6")
        .classList.toggle("active");
    } else if (index == 7) {
      document
        .getElementById("7")
        .classList.toggle("active");
    } else if (index == 8) {
      document
        .getElementById("8")
        .classList.toggle("active");
    } else if (index == 9) {
      document
        .getElementById("9")
        .classList.toggle("active");
    } else if (index == 10) {
      document
        .getElementById("10")
        .classList.toggle("active");
    }
  }
  let [currnetPage, setCurrentPage] = useState(1);

  return (
    <div className="container-fluid p-0 position-relative">
      <div className="d-flex flex-column">
        <Room />
      </div>
      <div
        className="가구추천 position-absolute"
        onChange={changeSidebar}
      >
        <Nav fill variant="tabs" defaultActiveKey="link-1">
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                가구종류변경(1); // 침대
                axios
                  .get(
                    "https://rudwl1005a.github.io/bed/beddata1.json"
                  )
                  .then((result) => {
                    가구변경([...result.data]);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
                toggleClass(currnetPage);
                toggleClass(1);
                setCurrentPage(1);
              }}
            >
              침대
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-2"
              onClick={() => {
                가구종류변경(2); // 옷장
                axios
                  .get(
                    "https://rudwl1005a.github.io/closet/closetdata1.json"
                  )
                  .then((result) => {
                    가구변경([...result.data]);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
                toggleClass(currnetPage);
                toggleClass(1);
                setCurrentPage(1);
              }}
            >
              옷장
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-3"
              onClick={() => {
                가구종류변경(3); // 책상
                axios
                  .get(
                    "https://rudwl1005a.github.io/desk/deskdata1.json"
                  )
                  .then((result) => {
                    가구변경([...result.data]);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
                toggleClass(currnetPage);
                toggleClass(1);
                setCurrentPage(1);
              }}
            >
              책상
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-4"
              onClick={() => {
                가구종류변경(4); // 서랍장
                axios
                  .get(
                    "https://rudwl1005a.github.io/drawer/drawerdata1.json"
                  )
                  .then((result) => {
                    가구변경([...result.data]);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
                toggleClass(currnetPage);
                toggleClass(1);
                setCurrentPage(1);
              }}
            >
              서랍장
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {가구종류 === 1 ? (
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
            <div className="page_wrap">
              <div className="page_nation">
                <a
                  href="#"
                  id="1"
                  className="active"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(1);
                    setCurrentPage(1);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/bed/beddata1.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  1
                </a>
                <a
                  href="#"
                  id="2"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(2);
                    setCurrentPage(2);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/bed/beddata2.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  2
                </a>
                <a
                  href="#"
                  id="3"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(3);
                    setCurrentPage(3);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/bed/beddata3.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  3
                </a>
                <a
                  href="#"
                  id="4"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(4);
                    setCurrentPage(4);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/bed/beddata4.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  4
                </a>
                <a
                  href="#"
                  id="5"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(5);
                    setCurrentPage(5);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/bed/beddata5.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  5
                </a>
              </div>
            </div>
          </div>
        ) : 가구종류 === 2 ? (
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
            <div className="page_wrap">
              <div className="page_nation">
                <a
                  href="#"
                  id="1"
                  className="active"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(1);
                    setCurrentPage(1);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/closet/closetdata1.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  1
                </a>
                <a
                  href="#"
                  id="2"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(2);
                    setCurrentPage(2);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/closet/closetdata2.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  2
                </a>
                <a
                  href="#"
                  id="3"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(3);
                    setCurrentPage(3);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/closet/closetdata3.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  3
                </a>
                <a
                  href="#"
                  id="4"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(4);
                    setCurrentPage(4);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/closet/closetdata4.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  4
                </a>
                <a
                  href="#"
                  id="5"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(5);
                    setCurrentPage(5);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/closet/closetdata5.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  5
                </a>
              </div>
            </div>
          </div>
        ) : 가구종류 === 3 ? (
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
            <div className="page_wrap">
              <div className="page_nation">
                <a
                  href="#"
                  id="1"
                  className="active"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(1);
                    setCurrentPage(1);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/desk/deskdata1.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  1
                </a>
                <a
                  href="#"
                  id="2"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(2);
                    setCurrentPage(2);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/desk/deskdata2.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  2
                </a>
                <a
                  href="#"
                  id="3"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(3);
                    setCurrentPage(3);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/desk/deskdata3.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  3
                </a>
                <a
                  href="#"
                  id="4"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(4);
                    setCurrentPage(4);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/desk/deskdata4.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  4
                </a>
                <a
                  href="#"
                  id="5"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(5);
                    setCurrentPage(5);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/desk/deskdata5.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  5
                </a>
              </div>
            </div>
          </div>
        ) : (
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
            <div className="page_wrap">
              <div className="page_nation">
                <a
                  href="#"
                  id="1"
                  className="active"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(1);
                    setCurrentPage(1);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/drawer/drawerdata1.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  1
                </a>
                <a
                  href="#"
                  id="2"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(2);
                    setCurrentPage(2);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/drawer/drawerdata2.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  2
                </a>
                <a
                  href="#"
                  id="3"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(3);
                    setCurrentPage(3);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/drawer/drawerdata3.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  3
                </a>
                <a
                  href="#"
                  id="4"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(4);
                    setCurrentPage(4);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/drawer/drawerdata4.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  4
                </a>
                <a
                  href="#"
                  id="5"
                  onClick={() => {
                    toggleClass(currnetPage);
                    toggleClass(5);
                    setCurrentPage(5);
                    axios
                      .get(
                        "https://rudwl1005a.github.io/drawer/drawerdata5.json"
                      )
                      .then((result) => {
                        가구변경([...result.data]);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  5
                </a>
              </div>
            </div>
          </div>
        )}
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
  );
};

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
      <p className="가구추천텍스트">
        {" "}
        {"가격 : " + props.가구.price}{" "}
      </p>
      <p className="가구추천텍스트">
        {" "}
        {"크기 : " +
          props.가구.width +
          " x " +
          props.가구.height +
          " mm"}{" "}
      </p>
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
