// 모달즈에 배경이랑 정말로 내용이 표시될 컴포넌트를 작성
// 테스트할땐 그 모달을 불러오는데 라우터로 표시말고 어떤 상태를 지정해놓고 그 상태가 트루일때만 그 모달이 전체화면에 렌더링 되도록
// 모달이 최 상위로 올라와야하고 다른 위치를 다 무시하도록
// 위치같은건 씨에스에스 우선 기능부터 되도록

// test.js 에 기본 배경 에 작동되는 버튼 하나 만들어놓고
// 그 버튼 클릭하면 로그인 모달창 더서 작동 되도록 구현하기

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoogleLoginBtn } from "../components/googleLoginBtn";
import { NaverLoginBtn } from "../components/naverLoginBtn";

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
  /* > .close-btn {
    position: absolute;
    top: 2px;
    right: 7px;
    cursor: pointer;
  } */
`;

const serverPath = process.env.REACT_APP_SERVER_PATH;

export const Login = ({ setLoginTokenOnNavbar, setIsLogin, closeFn }) => {
  // console.log(setIsLogin, "af");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginToken, setLoginToken] = useState("");
  const [id, setId] = useState("");
  // google
  // 상태이름 리팩토링 하면서 수정하기

  const navigate = useNavigate();

  const loginHandler = async () => {
    const response = await axios.post(`${serverPath}api/users/login`, {
      email: email,
      password: password,
    });
    return response;
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await loginHandler();
    if (res) {
      setLoginToken(res.data.accessToken);
      setId(res.data._id);
    }
    if (res.status === 200) {
      navSignup();
      setIsLogin(true);
      closeFn();
    }
  };

  useEffect(() => {
    setLoginTokenOnNavbar(loginToken);
  }, [loginToken]);

  const navSignup = () => {
    navigate("../mypage");
  };

  return (
      <ModalContainer onClick={closeFn}>
        <ModalForm>
          <ModalView>
            <Column> 이메일 </Column>
            <Input placeholder="이메일을 입력해주세욤" onChange={(e) => setEmail(e.target.value)}></Input>
            <Column> 비밀번호</Column>
            <Input type="password" placeholder="비밀번호를 입력해보시지요" onChange={(e) => setPassword(e.target.value)}></Input>
            <Column>
              <Btn onClick={submit}>로그인</Btn>
            </Column>
            <GoogleLoginBtn setLoginToken={setLoginToken} />
            {/* <NaverLoginBtn /> */}
            {/* <Column
              className="g-signin2"
              data-onsuccess="onSignIn"
              data-width="210"
              data-height="40"
              data-theme="dark"
              onClick={navSignup}
            ></Column> */}
            <Column>
              <Btn onClick={navSignup}>회원가입</Btn>
            </Column>
          </ModalView>
        </ModalForm>
      </ModalContainer>
  );
};

// 구글 로그인시 토큰 아이디 서버에 전달해줄것
