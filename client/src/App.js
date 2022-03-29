import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Mypage } from "./pages/mypage";
import { ModifyMyinfo } from "./pages/modifyMyinfo";
import { AddPost } from "./pages/addPost";
import { ModifyPost } from "./pages/modifyPost";

import { Navbar } from "./components/navbar";
import { PostThumbnail } from "./components/postThumbnail";
import { AddPostFloatBtn } from "./components/addPostFloatBtn";
import { Tag } from "./components/tagComponent";
import { GoogleLoginBtn } from "./components/googleLoginBtn";
import { Footer } from "./components/footer";
import { NaverLoginBtn } from "./components/naverLoginBtn";

import { OneBtnModal } from "./components/oneBtnModal";
import { TwoBtnModal } from "./components/twoBtnModal";
import { Login } from "./modals/login";
import { Signup } from "./modals/signup";



const GlobalStyles = createGlobalStyle`
    ${reset}
    .main{
      
      /* overflow: hidden; */
      /* 모달이 열린 경우 뒤의 화면의 스크롤이 생기지 않게 하려면 위의 내용을 추가시켜 줘야한다. */
      /* 모달이 열린 경우를 상태로 저장하여 클래스이름을 조건부 렌더링하면 해결 가능할 듯 */
      /* true ? className="main activeModal" : className="main"*/
    }
`;

const Container = styled.div`
position: relative;
width: 100vw;
min-height: 100vh;
height: max-content;
overflow: auto;
`

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
`

const TempContainer = styled.div`
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
`;

export const App = () => {
  const localStorage = window.localStorage

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loginToken") && localStorage.getItem("userId")) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  })

  return (
    <Container>
      <GlobalStyles />
      {/* <TempContainer></TempContainer> */}
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path="mypage/modify/" element={<ModifyMyinfo />} />
        <Route path="posts/:id/modify/" element={<ModifyPost />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="add_post" element={<AddPost />} />
      </Routes>
      <Footer />
    </Container>
  );
};

