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

import Home from "./Home.js";
import Login from "./Login.js";

const App = () => {
  return (
    <div className="App">
      <Navbar
        className="header mb-3"
        bg="light"
        expand="lg"
      >
        <Navbar.Brand href="#home">
          2D인테리어 (Open Web Project)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/"> Home </Nav.Link>
            <Nav.Link as={Link} to="/login"> Login </Nav.Link>
            <NavDropdown
              title="Dropdown"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

    </div>
  );
};

export default App;
