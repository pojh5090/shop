import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { connect } from 'react-redux';
import "./Detail.scss";
import { 재고context } from "./App.js";

import { CSSTransition } from "react-transition-group";

let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState("");

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);
  let 재고 = useContext(재고context);

  // 컴포넌트가 등장, 업데이트 될 때 실행함 (2가지 경우)
  useEffect(() => {
    //딱 처음 로딩 했을 때만 , axios 요청하고싶으면 여기에 쓰면 됨!
    //axios.get(); //이렇게 안에 사용 가능

    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
    };
  }, []);

  let { id } = useParams();
  let 해당상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });
  let history = useHistory();

  return (
    <div className="container">
      <박스>
        <제목 className="red">Detail</제목>
      </박스>
      <input
        onChange={(e) => {
          inputData변경(e.target.value);
        }}
      />
      {inputData}
      {alert == true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (해당상품.id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{해당상품.title}</h4>
          <p>{해당상품.content}</p>
          <p>{해당상품.price}</p>
          <Info 재고={재고}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 11, 12]);
              props.dispatch({type: '항목추가', payload: {id:2, name: '새상품', quan: 1}});
              history.push('/cart');
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              // history.goBack();
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {스위치변경(false); 누른탭변경(0);}}>
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => { 스위치변경(false); 누른탭변경(1);}}>
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>

    </div>
  );
}

function TabContent(props) {
    useEffect(()=>{
        props.스위치변경(true);
    })

    if (props.누른탭 === 0) {
        return <div>0번째</div>;
    } else if (props.누른탭 === 1) {
        return <div>1번째</div>;
    } else if (props.누른탭 === 2) {
        return <div>2번째</div>;
    }
}

function Info(props) {
  return <p>재고 : {props.재고[2]}</p>;
}

function 함수명(state){
    return {
        state : state.reducer,
        alert열였니 : state.reducer2
    }
}
export default connect(함수명)(Detail)