import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Mypage } from "./pages/mypage";
import { Navbar } from "./components/navbar";
import { PostThumbnail } from "./components/postThumbnail";
import { AddPostFloatBtn } from "./components/addPostFloatBtn";
import { OneBtnModal } from "./components/oneBtnModal";
import { TwoBtnModal } from "./components/twoBtnModal";


const GlobalStyles = createGlobalStyle`
    ${reset}

    .main{
      height: 100vh;
    }
`;

const TempContainer = styled.div`
  display: grid;
  place-items: center;
`

export const App = () => {
  return (
    <div className='main'>
      <GlobalStyles />
      <Navbar />
      <TempContainer>

      </TempContainer>
      <Routes>
        <Route path="mypage" element={<Mypage test={"test"}/>} />
      </Routes>
    </div>
  )
};
