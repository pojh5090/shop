import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components'
import './Detail.scss';

let 박스 = styled.div`
    padding : 20px;
`;

let 제목 = styled.h4`
    font-size : 25px;
    color: ${props => props.색상}
`


function Detail(props) {

    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState('');

    // 컴포넌트가 등장, 업데이트 될 때 실행함 (2가지 경우)
    useEffect(() => {
        //딱 처음 로딩 했을 때만 , axios 요청하고싶으면 여기에 쓰면 됨!
        //axios.get(); //이렇게 안에 사용 가능

        let 타이머 = setTimeout(() => { alert변경(false) }, 2000);
        return () => { clearTimeout(타이머) }
    }, []);

    let { id } = useParams();
    let 해당상품 = props.shoes.find(function (상품) {
        return 상품.id == id
    })
    let history = useHistory();

    return (
        <div className="container">
            <박스>
                <제목 className="red">Detail</제목>
            </박스>
            <input onChange={(e) => { inputData변경(e.target.value) }} />
            {inputData}
            {
                alert == true
                    ? (<div className="my-alert2">
                        <p>재고가 얼마 남지 않았습니다.</p>
                    </div>)
                    : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (해당상품.id + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{해당상품.title}</h4>
                    <p>{해당상품.content}</p>
                    <p>{해당상품.price}</p>
                    <Info 재고={props.재고}></Info>
                    <button className="btn btn-danger" onClick={() => { props.재고변경([9, 11, 12]) }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        // history.goBack();
                        history.push('/');
                    }}>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}

function Info(props) {
    return (
        <p>재고 : {props.재고[0]}</p>
    )
}

export default Detail;