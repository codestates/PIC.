import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Login } from "./modals/login";
import { GoogleLoginBtn } from "./components/googleLoginBtn";
import { Footer } from "./components/footer";
import { NaverLoginBtn } from "./components/naverLoginBtn";
import Signup from "./modals/signup";
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
min-height: 100vh;
height: max-content;
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
  const [loginToken, setLoginToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    if (loginToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [loginToken]);

  // useEffect(() => {
  //   if (isLogin) {
  //     nav("mypage");
  //     // 임시 경로(추후 게시판으로 이동해야함)
  //   }
  // });

  return (
    <Container>
      <GlobalStyles />
      <Navbar />
      <InnerContainer>
        <AddPostFloatBtn />
        {/* <TagSelection /> */}
        
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="mypage/modify/" element={<ModifyMyinfo />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="add_post" element={<AddPost />} />
        </Routes>
      </InnerContainer>

      <Footer />
    </Container>
  );
};

