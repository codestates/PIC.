import axios from "axios";
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
import { PostDetails } from "./pages/postDetails";

import { Navbar } from "./components/navbar";
import { PostThumbnail } from "./components/postThumbnail";
import { AddPostFloatBtn } from "./components/addPostFloatBtn";
import { Tag } from "./components/tagComponent";
import { Footer } from "./components/footer";

import { OneBtnModal } from "./components/oneBtnModal";
import { TwoBtnModal } from "./components/twoBtnModal";
import { TagSearch } from "./pages/tagSearch";
import { CommentContainer } from "./components/commentContainer";
import { NaverCallback } from "./pages/naverCallback";
import { KakaoCallback } from "./pages/kakaoCallback";
import { KeywordsSearch } from './pages/keywordsSearch';

import { MyPics } from "./pages/categories/myPics";
import { MostLikes } from "./pages/categories/mostLikes";
import { NewPics } from "./pages/categories/newPics";
import { Favorites } from "./pages/categories/favorites";


const GlobalStyles = createGlobalStyle`
    a {
      color : black;
    }
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
height: 100vh;
min-height: 100vh;
`

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  
  height: max-content;
  min-height: 700px;
  

  margin-top: 200px;
  margin-bottom: 200px;
`

export const App = () => {
  const sessionStorage = window.sessionStorage;

  const [isLogin, setIsLogin] = useState(false);

  useEffect(async () => {
    if (sessionStorage.getItem("loginToken") && sessionStorage.getItem("userId")) {
      setIsLogin(true)
    } else {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/api/users/auth/token`);
      console.log(res)
      if (res.data.message === "success") {
        sessionStorage.setItem("userId", res.data._id)
        sessionStorage.setItem("loginToken", res.data.accessToken)
        sessionStorage.setItem("loginMethod", "common")
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    }
  })

  return (
    <Container>
      {/* <Signup /> */}
      <GlobalStyles />
      {/* <TempContainer></TempContainer> */}
      <Navbar isLogin={isLogin} />
      <InnerContainer>
        <Routes>
          <Route path="my_pics" element={<MyPics />} />
          <Route path="most_likes" element={<MostLikes/>} />
          <Route path="new_pics" element={<NewPics />} />
          <Route path="favorites" element={<Favorites />} />

          <Route path="mypage/modify/" element={<ModifyMyinfo />} />
          <Route path="posts/:id/modify/" element={<ModifyPost />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="add_post" element={<AddPost />} />
          <Route path="posts/:id/comment" element={<CommentContainer />} />
          <Route path="tags" element={<TagSearch />} />
          <Route path="callback/naver" element={<NaverCallback />} />
          <Route path="callback/kakao" element={<KakaoCallback />} />
          <Route path="tags"  element={<TagSearch />} />
          <Route path="keywords"  element={<KeywordsSearch />} />
        </Routes>
      </InnerContainer>
      <Footer />
    </Container>
  );
};
