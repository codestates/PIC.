import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Mypage } from "./pages/mypage";
import { ModifyMyinfo } from "./pages/modifyMyinfo";
import { AddPost } from "./pages/addPost";

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

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const TempContainer = styled.div`
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
`

export const App = () => {
  return (
    <div className="main">
      <GlobalStyles />
      <Navbar />
      <AddPostFloatBtn />

      <Tag>asd</Tag>
      <Tag usage={'added'}>asd</Tag>
      <Container>
        <Routes>
          <Route path="mypage" element={<Mypage />} />
          <Route path="mypage/modify/" element={<ModifyMyinfo />} />
          <Route path="add_post" element={<AddPost />} />
        </Routes>
      </Container>
      <div style={{ height: '200px', background: '#ffd600' }}>fake footer</div>
    </div>
  )
};
