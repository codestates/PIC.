import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// const clientId = "dTBEtabH3xT8LbArVnzz";
export const NaverLoginBtn = () => {
  const { naver } = window;
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [code, setCode] = useState('')
  const [nidState, setNidState] = useState('')
  const navigate = useNavigate()

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "dTBEtabH3xT8LbArVnzz",
      callbackUrl: "http://localhost:3000",
      isPopup: false,
      loginButton: { color: "white", type: 3, height: "40" },
    });
    naverLogin.init();
  };
  const naverCode = () => {
    const url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=dTBEtabH3xT8LbArVnzz&redirect_uri=http://localhost:3000&state=a4f9fff7-9131-4eda-9de5-76b36320cc51"
    window.location.replace(url)
  }

  const uriParam = window.location.search.replace('?', '')
    .split('&')
    .map((params) => {
      return params.split('=')
    })

  const params = Object.fromEntries(uriParam)
  console.log(params, "PARAMS")
  useEffect(() => {
    if (window.location.search && params) {
      setCode(params.code)
      setNidState(params.state)
      // 이 위치에 요청 작성
    }
    console.log(code, "CODE", nidState, "STATE")
  }, [])

  useEffect(() => {
    if (code && nidState) {
      axios.post(`${serverPath}/api/users/oauth/naver`, {
        code: code,
        state: nidState,
      })
    }
  }, [code, nidState])

  return <div onClick={naverCode}>
    <button>NAVER</button>
  </div>;
};
