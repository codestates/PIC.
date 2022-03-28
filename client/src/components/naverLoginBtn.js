import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// const clientId = "dTBEtabH3xT8LbArVnzz";
export const NaverLoginBtn = () => {
  const { naver } = window;
  const location = useLocation();
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  // autho 코드만 네이버에서 받아오기
  // 그 코드 서버로 전달

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "dTBEtabH3xT8LbArVnzz",
      callbackUrl: "http://localhost:3000",
      isPopup: false,
      loginButton: { color: "white", type: 3, height: "40" },
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split("=")[1].split("&")[0];
    // axios.post(`${serverPath}`);
    console.log(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);
  return <div id="naverIdLogin"></div>;
};
