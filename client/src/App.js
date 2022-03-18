import React from "react";
import { Routes, Route } from "react-router-dom";
import Styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Mypage } from "./pages/mypage";

const GlobalStyles = createGlobalStyle`
    ${reset}
`;

export const App = () => {
  return (
    <div>
      <GlobalStyles />
      App.js
      <Routes>
        <Route path="mypage" element={<Mypage />} />
      </Routes>
    </div>
  )
};
