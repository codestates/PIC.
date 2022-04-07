import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { GoogleLoginBtn } from "../components/googleLoginBtn";
import { NaverLoginBtn } from "../components/naverLoginBtn";
import { KakaoLoginBtn } from "../components/kakaoLoginBtn"

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 10px;
  width: 200px;
  height: 30px;
`;

const Btn = styled.button`
  background-color: gray;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: black;
  border-radius: 20px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Column = styled.div`
  align-items: left;
  margin-bottom: 10px;
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 400px;
  height: 800px;
  border-radius: 1rem;
  position: relative;
  .nofi {
    color: red;
  }
  /* > .close-btn {
    position: absolute;
    top: 2px;
    right: 7px;
    cursor: pointer;
  } */
`;

const CloseBtn = styled.button`
`
const serverPath = process.env.REACT_APP_SERVER_PATH;

export const Login = ({ closeFn, setOpenSignupModal, setOpenLoginModal }) => {
  const sessionStorage = window.sessionStorage;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false)

  const submit = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.post(`${serverPath}/api/users/login`, {
        email: email,
        password: password,
      })
      console.log(res, "RES")
      if (res) {
        sessionStorage.setItem("userId", res.data._id)
        sessionStorage.setItem("loginToken", res.data.accessToken)
        sessionStorage.setItem("loginMethod", "common")
        closeFn();
        window.location.reload()
      }
    } catch (err) {
      setFailedLogin(true)
    }
  };

  const enterEvent = (e) => {
    if (window.event.keyCode == 13) {
      submit()
    }
  }

  const openSignup = () => {
    setOpenLoginModal(false)
    setOpenSignupModal(true)
  };

  return (
    <ModalContainer>
      <ModalForm>
        <ModalView><CloseBtn onClick={closeFn}>x</CloseBtn>
          <Column> 이메일 </Column>
          <Input placeholder="이메일을 입력해주세요" onChange={(e) => setEmail(e.target.value)}></Input>
          <Column> 비밀번호</Column>
          <Input type="password" onKeyUp={enterEvent} placeholder="비밀번호를 입력해주세요" onChange={(e) => setPassword(e.target.value)}></Input>
          {failedLogin ? <div className="nofi">이메일과 비밀번호를 확인해 주세요</div> : null}
          <Column onClick={submit}>
            <Btn>로그인</Btn>
          </Column>
          <GoogleLoginBtn />
          <NaverLoginBtn />
          <KakaoLoginBtn />
          <Column>
            <Btn onClick={openSignup}>회원가입</Btn>
          </Column>
        </ModalView>
      </ModalForm>
    </ModalContainer>
  );
};
