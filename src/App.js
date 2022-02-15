/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';
import './App.css';

import { Link, Route, Switch } from 'react-router-dom';

export let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);   // 이렇게 불러옴!
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
          <div className="container">

            <재고context.Provider value={재고}>
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i} key={i} />
                  })
                }
              </div>
            </재고context.Provider>

            <button className="btn btn-primary" onClick={() => {
              // axios.post('서버url', { id: 'kjh', pw: 1234});
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  shoes변경([...shoes, ...result.data]);     //이렇게 ...쓰는건 대괄호를 벗기는 것!  [ {}, {} , {} ] 
                })
                .catch(() => {
                  console.log('실패했어요')
                })
            }}>더보기</button>
          </div>
        </Route>

        <Route exact path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
          </재고context.Provider>
        </Route>
        {/* <Route path="/어쩌구" component={Modal}></Route> */}

        <Route path="/:id">
          <div>아무거나 적었을 때 이거 보여주삼</div>
        </Route>
        {/* 위에 Route는 어떤 url이던 다 보임!(/뒤에 어떤 문자가 오던지 보여줘~) 리엑트 라우터가 원래 그러니까 ..*/}

      </Switch>


    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      <Test></Test>
    </div>
  )
}

function Test() {
  let 재고 = useContext(재고context);  //( )안에는 범위를 적어주는 것.
  return <p>재고 : {재고}</p>
}


export default App;
