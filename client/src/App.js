import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Mypage } from "./pages/mypage";
import { ModifyMyinfo } from "./pages/modifyMyinfo";

import { Navbar } from "./components/navbar";
import { PostThumbnail } from "./components/postThumbnail";
import { AddPostFloatBtn } from "./components/addPostFloatBtn";
import { OneBtnModal } from "./components/oneBtnModal";
import { TwoBtnModal } from "./components/twoBtnModal";
import { Tag } from "./components/tagComponent";




const GlobalStyles = createGlobalStyle`
    ${reset}

    .main{
      height: 100vh;
      /* overflow: hidden; */
      /* 모달이 열린 경우 뒤의 화면의 스크롤이 생기지 않게 하려면 위의 내용을 추가시켜 줘야한다. */
      /* 모달이 열린 경우를 상태로 저장하여 클래스이름을 조건부 렌더링하면 해결 가능할 듯 */
      /* true ? className="main activeModal" : className="main"*/
    }
`;

const TempContainer = styled.div`
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
`

const arr = ['안녕', '하세요', '아우', '졸려라', '뭔가', '뇌가','안돌아간다', '으아아악'];

export const App = () => {
  return (
    <div className='main'>
      <GlobalStyles />
      <Navbar />

      <TempContainer> 
        <Tag usage={'added'} action={() => console.log('삭제하는 함수 실행')}>내가 추가한 태그</Tag>
        <Tag usage={'add'} action={() => console.log('추가하는 함수 실행')}>추가할 태그</Tag>
        
        {arr.map((el, idx) => <Tag key={idx}>{el}</Tag>)}
      </TempContainer>

      <Routes>
        <Route path="mypage" element={<Mypage test={"test"} />} />
        <Route path="mypage/modify/" element={<ModifyMyinfo />} />
      </Routes>
    </div>
  )
};
